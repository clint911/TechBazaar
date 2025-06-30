import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { ObjectId } from "mongodb"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id

        const user = await this.userRepository.findOneBy({ id: new ObjectId(id) })

        if (!user) {
            return "unregistered user"
        }
        return user
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, age } = request.body;

        const user = Object.assign(new User(), {
            firstName,
            lastName,
            age
        })

        return this.userRepository.save(user)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id

        let userToRemove = await this.userRepository.findOneBy({ id: new ObjectId(id) })

        if (!userToRemove) {
            return "this user not exist"
        }

        await this.userRepository.remove(userToRemove)

        return "user has been removed"
    }

    async register (request: Request, response: Response, next: NextFunction) {
        const { userName, email, password } = request.body; 

        // First Validation  
        if (!(userName && email && password)) {
            return response.status(400).json({ message: "Error! Missing field detected, All fields are required" });
        }

        // Check if user already exists
        const existingUser = await this.userRepository.findOne({
             where: { userName }
            });
        if (existingUser) {
            return response.status(400).json({ message: "Error! User already exists, please try again with a different username and/or email" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = this.userRepository.create({
            userName,
            email,
            password: hashedPassword,
            role: "normal_user" as any,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        // Save the user to the database
        await this.userRepository.save(createdUser);
        
        // Generate a JWT token 
        const token = jwt.sign(
            { 
                userId: createdUser.id,
                email: createdUser.email,
                role: createdUser.role
             },
              process.env.JWT_SECRET,
               { expiresIn: "1h" });
        return response.status(201).json({ message: "User created successfully", token });
    }

    // User Login 
    async login (request: Request, response: Response, next: NextFunction) { 
        const { email, password } = request.body;

        // First Validation 
        if (!(email && password)) {
            return response.status(400).json({ message: "Error! Missing field detected, All fields are required" });
        }

        // Find user  
        const user = await this.userRepository.findOne({ where: { email } }); 
        if (!user) {
            return response.status(400).json({ message: "Error! User not found, invalid credentials!" });
        }

        // Verify password 
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return response.status(400).json({ message: "Error! Invalid credentials!" });
        }

        // Generate a JWT token 
        const token = jwt.sign(
            { 
                userId: user.id, email: user.email, role: user.role
             }, 
             process.env.JWT_SECRET,
            { 
                expiresIn: "1h" 
            }
        );
        return response.status(200).json({
             message: "Login successful", 
             token,
             userId: user.id,
             role: user.role
            });
    }

    // Get the Current user profile, this is a protected route my guy 
    async profile(request: Request, response: Response, next: NextFunction) {
        // JWT middleware should attach user to request 
        const userId = (request as any).user.userId;
        const user = await this.userRepository.findOne({ 
            where: { id: new ObjectId(userId) },
            select: ["id", "userName", "email", "role"] // Exclude password from the response  
        });
        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }
        return response.status(200).json({ user });
    }

}   







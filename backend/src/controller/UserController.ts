import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import * as bcrypt from "bcrypt"
import * as jwt from "jsonwebtoken"
import { ObjectId } from "mongodb"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return await this.userRepository.find()
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id
        const user = await this.userRepository.findOneBy({ id: new ObjectId(id) })
        if (!user) {
            return { error: "unregistered user" }
        }
        return {
             user: user.id,
            userEmail: user.email,
            userName: user.userName,
            userCreated: user.createdAt,
            userUpdated: user.updatedAt
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, age } = request.body;
        const user = Object.assign(new User(), {
            firstName,
            lastName,
            age
        })
        return await this.userRepository.save(user)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id
        let userToRemove = await this.userRepository.findOneBy({ id: new ObjectId(id) })
        if (!userToRemove) {
            return { error: "this user not exist" }
        }
        await this.userRepository.remove(userToRemove)
        return { message: "user has been removed" }
    }

    async register(request: Request, response: Response, next: NextFunction) {
        try {
            const { userName, email, password } = request.body;
        if (!(userName && email && password)) {
                return { error: "Error! Missing field detected, All fields are required" };
        }
            const existingUser = await this.userRepository.findOne({ where: { userName } });
        if (existingUser) {
                return { error: "Error! User already exists, please try again with a different username and/or email" };
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = this.userRepository.create({
            userName,
            email,
            password: hashedPassword,
            role: "normal_user" as any,
            createdAt: new Date(),
            updatedAt: new Date()
        });
        await this.userRepository.save(createdUser);
        const token = jwt.sign(
            {
                userId: createdUser.id,
                email: createdUser.email,
                role: createdUser.role
             },
              process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );
            return { message: "User created successfully", token };
        } catch (error) {
            return { error: "Registration failed", details: error.message };
        }
    }

    async login(request: Request, response: Response, next: NextFunction) {
        const { email, password } = request.body;
        if (!(email && password)) {
            return { error: "Error! Missing field detected, All fields are required" };
        }
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            return { error: "Error! User not found, invalid credentials!" };
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { error: "Error! Invalid credentials!" };
        }
        const token = jwt.sign(
            {
                userId: user.id, email: user.email, role: user.role
             },
             process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );
        return {
             message: "Login successful",
             token,
             userId: user.id,
             role: user.role
        };
    }

    async profile(request: Request, response: Response, next: NextFunction) {
        const userId = (request as any).user.userId;
        const user = await this.userRepository.findOne({
            where: { id: new ObjectId(userId) },
            select: ["id", "userName", "email", "role", "createdAt", "updatedAt"]
        });
        if (!user) {
            return { error: "User not found" };
        }
        return {
            user: user.id,
            userEmail: user.email,
            userName: user.userName,
            userCreated: user.createdAt,
            userUpdated: user.updatedAt
        };
    }
}







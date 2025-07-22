import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { User } from "./entity/User"
//import { UserRole } from "./entity/User";
import * as cors from 'cors'

AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())
    app.use(cors())

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.json(result) : /*undefined*/ res.sendStatus(404))

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })
    

    // setup express app here
    // ...

    // start express server
    app.listen(3000)

    // insert new users for test
    await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
            userName: "TimberKnight",
            email: "Sawoodguy@gmail.com",
            password: "123456",
            role: "admin_user",
            createdAt: new Date(),
            updatedAt: new Date()
        })
    )

    await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
            userName: "Phantom",
            email: "Phantom@gmail.com",
            password: "123456",
            role: "normal_user",
            createdAt: new Date(),
            updatedAt: new Date()
        })
    )
    

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results")

}).catch(error => console.log(error))

import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm"

export type UserRole = "admin_user" | "normal_user";

@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectId

    @Column()
    userName: string

    @Column()
    email: string

    @Column()
    password: string 

    @Column() 
    role: UserRole 

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date

}

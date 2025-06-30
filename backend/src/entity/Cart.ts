import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

@Entity()
export class Cart {
    @ObjectIdColumn()
    id: ObjectId

    @Column("objectId")
    userId: ObjectId

    @Column()
    totalPrice: number

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date

    @Column()
    isActive: boolean
}


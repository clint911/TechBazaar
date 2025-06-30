import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

@Entity()
export class OrderItem {
    @ObjectIdColumn()
    id: ObjectId

    @Column("objectId")
    orderId: ObjectId

    @Column("objectId")
    productId: ObjectId

    @Column()
    quantity: number

    @Column()
    price: number
}


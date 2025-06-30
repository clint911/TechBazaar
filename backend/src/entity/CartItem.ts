import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

@Entity()
export class CartItem {
    @ObjectIdColumn()
    id: ObjectId

    @Column("objectId")
    cartId: ObjectId

    @Column("objectId")
    productId: ObjectId

    @Column()
    quantity: number
}



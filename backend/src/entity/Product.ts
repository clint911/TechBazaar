import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

type ProductCategory = "computers" | "laptops" | "keyboards" | "tablets";

@Entity()
export class Product {
    @ObjectIdColumn()
    id: ObjectId

    @Column()
    productName: string

    @Column()
    price: number

    @Column()
    productDescription: string

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date

    @Column()
    productImageUrl: string | null

    @Column()
    category: ProductCategory

    @Column()
    stockQuantity: number

}
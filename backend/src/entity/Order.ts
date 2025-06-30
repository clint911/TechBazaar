import { Entity, ObjectIdColumn, ObjectId, Column } from "typeorm";

type PaymentMethod = "crypto" | "credit_card" | "debit_card" | "paypal" | "stripe" | "cash_on_delivery" | "bank_transfer" | "other";

type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";

type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

@Entity()
export class Order {
    @ObjectIdColumn()
    id: ObjectId

    @Column("objectId")
    userId: ObjectId

    @Column()
    totalPrice: number
    
    // created at and updated at 
    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date
    
    @Column()
    totalQuantity: number 

    @Column()
    shippingAddress: string 

    // status pending, shipped, delivered, cancelled  
    @Column()
    status: OrderStatus 

    // payment method 
    @Column()
    paymentMethod: PaymentMethod 

    // payment status 
    @Column()
    paymentStatus: PaymentStatus 

    // payment id 
    @Column()
    paymentId: string 

    // payment amount 
    @Column()
    paymentAmount: number 
}
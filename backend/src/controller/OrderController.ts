import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Order } from "../entity/Order"
import { OrderItem } from "../entity/OrderItem"
import { Cart } from "../entity/Cart"
import { User } from "../entity/User"
import { Product } from "../entity/Product"
import { CartItem } from "../entity/CartItem"
import { ObjectId } from "mongodb"

export class OrderController {
    private orderRepository = AppDataSource.getRepository(Order)
    private orderItemRepository = AppDataSource.getRepository(OrderItem)
    private cartRepository = AppDataSource.getRepository(Cart)
    private userRepository = AppDataSource.getRepository(User)
    private productRepository = AppDataSource.getRepository(Product)
    private cartItemRepository = AppDataSource.getRepository(CartItem)

    async getOrders(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = (request as any).user.userId
            const orders = await this.orderRepository.findBy({ userId: new ObjectId(userId) })
            const ordersWithItems = await Promise.all(orders.map(async order => {
                const orderItems = await this.orderItemRepository.findBy({ orderId: order.id })
                const itemsWithProduct = await Promise.all(orderItems.map(async item => {
                    const product = await this.productRepository.findOneBy({ id: item.productId })
                    return { ...item, product }
                }))
                return { ...order, orderItems: itemsWithProduct }
            }))
            return { orders: ordersWithItems }
        } catch (error) {
            return { error: "Error fetching orders", details: error.message }
        }
    }

    async createOrder(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = (request as any).user.userId
            const { shippingAddress, paymentMethod } = request.body
            if (!(shippingAddress && paymentMethod)) {
                return { error: "Error! Missing required fields" }
            }
            const cart = await this.cartRepository.findOneBy({ userId: new ObjectId(userId) })
            if (!cart) {
                return { error: "Cart is empty" }
            }
            const cartItems = await this.cartItemRepository.findBy({ cartId: cart.id })
            if (!cartItems.length) {
                return { error: "Cart is empty" }
            }
            for (const cartItem of cartItems) {
                const product = await this.productRepository.findOneBy({ id: cartItem.productId })
                if (!product || product.stockQuantity < cartItem.quantity) {
                    return { error: `Insufficient stock for product: ${product?.productName || 'Unknown'}` }
                }
            }
            const order = this.orderRepository.create({
                userId: new ObjectId(userId),
                totalPrice: cart.totalPrice,
                totalQuantity: cartItems.reduce((total, item) => total + item.quantity, 0),
                shippingAddress,
                paymentMethod,
                status: "pending",
                paymentStatus: "pending",
                paymentId: "",
                paymentAmount: cart.totalPrice,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            const savedOrder = await this.orderRepository.save(order)
            for (const cartItem of cartItems) {
                const product = await this.productRepository.findOneBy({ id: cartItem.productId })
                const orderItem = this.orderItemRepository.create({
                    orderId: savedOrder.id,
                    productId: cartItem.productId,
                    quantity: cartItem.quantity,
                    price: product?.price || 0
                })
                await this.orderItemRepository.save(orderItem)
                if (product) {
                    product.stockQuantity -= cartItem.quantity
                    await this.productRepository.save(product)
                }
            }
            await this.cartItemRepository.delete({ cartId: cart.id })
            cart.totalPrice = 0
            cart.updatedAt = new Date()
            await this.cartRepository.save(cart)
            return { message: "Order created successfully", order: savedOrder }
        } catch (error) {
            return { error: "Error creating order", details: error.message }
        }
    }

    async getOrderDetails(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = (request as any).user.userId
            const orderId = request.params.id
            const order = await this.orderRepository.findOneBy({ id: new ObjectId(orderId), userId: new ObjectId(userId) })
            if (!order) {
                return { error: "Order not found" }
            }
            const orderItems = await this.orderItemRepository.findBy({ orderId: order.id })
            const itemsWithProduct = await Promise.all(orderItems.map(async item => {
                const product = await this.productRepository.findOneBy({ id: item.productId })
                return { ...item, product }
            }))
            return { order: { ...order, orderItems: itemsWithProduct } }
        } catch (error) {
            return { error: "Error fetching order details", details: error.message }
        }
    }

    async updateOrder(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = (request as any).user.userId
            const orderId = request.params.id
            const { status, paymentStatus, paymentId } = request.body
            const order = await this.orderRepository.findOneBy({ id: new ObjectId(orderId), userId: new ObjectId(userId) })
            if (!order) {
                return { error: "Order not found" }
            }
            if (status) order.status = status
            if (paymentStatus) order.paymentStatus = paymentStatus
            if (paymentId) order.paymentId = paymentId
            order.updatedAt = new Date()
            const updatedOrder = await this.orderRepository.save(order)
            return { message: "Order updated successfully", order: updatedOrder }
        } catch (error) {
            return { error: "Error updating order", details: error.message }
        }
    }

    async cancelOrder(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = (request as any).user.userId
            const orderId = request.params.id
            const order = await this.orderRepository.findOneBy({ id: new ObjectId(orderId), userId: new ObjectId(userId) })
            if (!order) {
                return { error: "Order not found" }
            }
            const orderItems = await this.orderItemRepository.findBy({ orderId: order.id })
            for (const orderItem of orderItems) {
                const product = await this.productRepository.findOneBy({ id: orderItem.productId })
                if (product) {
                    product.stockQuantity += orderItem.quantity
                    await this.productRepository.save(product)
                }
            }
            order.status = "cancelled"
            order.updatedAt = new Date()
            await this.orderRepository.save(order)
            return { message: "Order cancelled successfully", order }
        } catch (error) {
            return { error: "Error cancelling order", details: error.message }
        }
    }
} 
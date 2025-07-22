import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { Cart } from "../entity/Cart"
import { CartItem } from "../entity/CartItem"
import { Product } from "../entity/Product"
import { User } from "../entity/User"
import { ObjectId } from "mongodb"

export class CartController {
    private cartRepository = AppDataSource.getRepository(Cart)
    private cartItemRepository = AppDataSource.getRepository(CartItem)
    private productRepository = AppDataSource.getRepository(Product)
    private userRepository = AppDataSource.getRepository(User)

    async getCart(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = (request as any).user.userId
            const cart = await this.cartRepository.findOneBy({ userId: new ObjectId(userId.toString()) })
            if (!cart) {
                return { error: "Cart not found" }
            }
            const cartItems = await this.cartItemRepository.findBy({ cartId: cart.id })
            const itemsWithProduct = await Promise.all(cartItems.map(async item => {
                const product = await this.productRepository.findOneBy({ id: item.productId })
                return { ...item, product }
            }))
            return { cart, cartItems: itemsWithProduct }
        } catch (error) {
            return { error: "Error fetching cart", details: error.message }
        }
    }

    async addToCart(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = (request as any).user.userId
            const { productId, quantity } = request.body
            if (!(productId && quantity)) {
                return { error: "Error! Missing required fields" }
            }
            let cart = await this.cartRepository.findOneBy({ userId: new ObjectId(userId.toString()) })
            if (!cart) {
                cart = this.cartRepository.create({
                    userId: new ObjectId(userId.toString()),
                    totalPrice: 0,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isActive: true
                })
                await this.cartRepository.save(cart)
            }
            const product = await this.productRepository.findOneBy({ id: new ObjectId(productId) })
            if (!product) {
                return { error: "Product not found" }
            }
            let cartItem = await this.cartItemRepository.findOneBy({ cartId: cart.id, productId: product.id })
            if (cartItem) {
                cartItem.quantity += quantity
                await this.cartItemRepository.save(cartItem)
            } else {
                cartItem = this.cartItemRepository.create({
                    cartId: cart.id,
                    productId: product.id,
                    quantity
                })
                await this.cartItemRepository.save(cartItem)
            }
            const cartItems = await this.cartItemRepository.findBy({ cartId: cart.id })
            cart.totalPrice = await cartItems.reduce(async (totalPromise, item) => {
                const total = await totalPromise
                const prod = await this.productRepository.findOneBy({ id: item.productId })
                return total + ((prod?.price || 0) * item.quantity)
            }, Promise.resolve(0))
            cart.updatedAt = new Date()
            await this.cartRepository.save(cart)
            return { message: "Product added to cart successfully", cart }
        } catch (error) {
            return { error: "Error adding to cart", details: error.message }
        }
    }

    async updateQuantity(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = (request as any).user.userId
            const { productId, quantity } = request.body
            if (!(productId && quantity)) {
                return { error: "Error! Missing required fields" }
            }
            const cart = await this.cartRepository.findOneBy({ userId: new ObjectId(userId.toString()) })
            if (!cart) {
                return { error: "Cart not found" }
            }
            const cartItem = await this.cartItemRepository.findOneBy({ cartId: cart.id, productId: new ObjectId(productId) })
            if (!cartItem) {
                return { error: "Product not found in cart" }
            }
            cartItem.quantity = quantity
            await this.cartItemRepository.save(cartItem)
            const cartItems = await this.cartItemRepository.findBy({ cartId: cart.id })
            cart.totalPrice = await cartItems.reduce(async (totalPromise, item) => {
                const total = await totalPromise
                const prod = await this.productRepository.findOneBy({ id: item.productId })
                return total + ((prod?.price || 0) * item.quantity)
            }, Promise.resolve(0))
            cart.updatedAt = new Date()
            await this.cartRepository.save(cart)
            return { message: "Quantity updated successfully", cart }
        } catch (error) {
            return { error: "Error updating quantity", details: error.message }
        }
    }

    async removeFromCart(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = (request as any).user.userId
            const { productId } = request.body
            if (!productId) {
                return { error: "Error! Product ID is required" }
            }
            const cart = await this.cartRepository.findOneBy({ userId: new ObjectId(userId.toString()) })
            if (!cart) {
                return { error: "Cart not found" }
            }
            const cartItem = await this.cartItemRepository.findOneBy({ cartId: cart.id, productId: new ObjectId(productId) })
            if (!cartItem) {
                return { error: "Product not found in cart" }
            }
            await this.cartItemRepository.remove(cartItem)
            const cartItems = await this.cartItemRepository.findBy({ cartId: cart.id })
            cart.totalPrice = await cartItems.reduce(async (totalPromise, item) => {
                const total = await totalPromise
                const prod = await this.productRepository.findOneBy({ id: item.productId })
                return total + ((prod?.price || 0) * item.quantity)
            }, Promise.resolve(0))
            cart.updatedAt = new Date()
            await this.cartRepository.save(cart)
            return { message: "Product removed from cart successfully", cart }
        } catch (error) {
            return { error: "Error removing from cart", details: error.message }
        }
    }
} 
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
                return response.status(404).json({ message: "Cart not found" })
            }
            const cartItems = await this.cartItemRepository.findBy({ cartId: cart.id })
            // Populate product details for each cart item
            const itemsWithProduct = await Promise.all(cartItems.map(async item => {
                const product = await this.productRepository.findOneBy({ id: item.productId })
                return { ...item, product }
            }))
            return response.status(200).json({ cart, cartItems: itemsWithProduct })
        } catch (error) {
            return response.status(500).json({ message: "Error fetching cart", error: error.message })
        }
    }

    async addToCart(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = (request as any).user.userId
            const { productId, quantity } = request.body
            if (!(productId && quantity)) {
                return response.status(400).json({ message: "Error! Missing required fields" })
            }
            // Find or create cart for user
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
            // Check if product exists
            const product = await this.productRepository.findOneBy({ id: new ObjectId(productId) })
            if (!product) {
                return response.status(404).json({ message: "Product not found" })
            }
            // Check if product is already in cart
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
            // Update total price
            const cartItems = await this.cartItemRepository.findBy({ cartId: cart.id })
            cart.totalPrice = await cartItems.reduce(async (totalPromise, item) => {
                const total = await totalPromise
                const prod = await this.productRepository.findOneBy({ id: item.productId })
                return total + ((prod?.price || 0) * item.quantity)
            }, Promise.resolve(0))
            cart.updatedAt = new Date()
            await this.cartRepository.save(cart)
            return response.status(200).json({ message: "Product added to cart successfully", cart })
        } catch (error) {
            return response.status(500).json({ message: "Error adding to cart", error: error.message })
        }
    }

    async updateQuantity(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = (request as any).user.userId
            const { productId, quantity } = request.body
            if (!(productId && quantity)) {
                return response.status(400).json({ message: "Error! Missing required fields" })
            }
            const cart = await this.cartRepository.findOneBy({ userId: new ObjectId(userId.toString()) })
            if (!cart) {
                return response.status(404).json({ message: "Cart not found" })
            }
            const cartItem = await this.cartItemRepository.findOneBy({ cartId: cart.id, productId: new ObjectId(productId) })
            if (!cartItem) {
                return response.status(404).json({ message: "Product not found in cart" })
            }
            cartItem.quantity = quantity
            await this.cartItemRepository.save(cartItem)
            // Update total price
            const cartItems = await this.cartItemRepository.findBy({ cartId: cart.id })
            cart.totalPrice = await cartItems.reduce(async (totalPromise, item) => {
                const total = await totalPromise
                const prod = await this.productRepository.findOneBy({ id: item.productId })
                return total + ((prod?.price || 0) * item.quantity)
            }, Promise.resolve(0))
            cart.updatedAt = new Date()
            await this.cartRepository.save(cart)
            return response.status(200).json({ message: "Quantity updated successfully", cart })
        } catch (error) {
            return response.status(500).json({ message: "Error updating quantity", error: error.message })
        }
    }

    async removeFromCart(request: Request, response: Response, next: NextFunction) {
        try {
            const userId = (request as any).user.userId
            const { productId } = request.body
            if (!productId) {
                return response.status(400).json({ message: "Error! Product ID is required" })
            }
            const cart = await this.cartRepository.findOneBy({ userId: new ObjectId(userId.toString()) })
            if (!cart) {
                return response.status(404).json({ message: "Cart not found" })
            }
            const cartItem = await this.cartItemRepository.findOneBy({ cartId: cart.id, productId: new ObjectId(productId) })
            if (!cartItem) {
                return response.status(404).json({ message: "Product not found in cart" })
            }
            await this.cartItemRepository.remove(cartItem)
            // Update total price
            const cartItems = await this.cartItemRepository.findBy({ cartId: cart.id })
            cart.totalPrice = await cartItems.reduce(async (totalPromise, item) => {
                const total = await totalPromise
                const prod = await this.productRepository.findOneBy({ id: item.productId })
                return total + ((prod?.price || 0) * item.quantity)
            }, Promise.resolve(0))
            cart.updatedAt = new Date()
            await this.cartRepository.save(cart)
            return response.status(200).json({ message: "Product removed from cart successfully", cart })
        } catch (error) {
            return response.status(500).json({ message: "Error removing from cart", error: error.message })
        }
    }
} 
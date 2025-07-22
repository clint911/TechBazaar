import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { Product } from "../entity/Product"
import { ObjectId } from "mongodb"

export class ProductController {
    private productRepository = AppDataSource.getRepository(Product)

    async all(request: Request, response: Response, next: NextFunction) {
        try {
            const { category } = request.query;
            const filter: any = {};
            if (category) {
                filter.category = category;
            }
            const products = await this.productRepository.find({ where: filter });
            return { products };
        } catch (error) {
            return { error: "Error fetching products", details: error.message };
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id
            if (!ObjectId.isValid(id)) {
                return { error: "Invalid product ID format" };
            }
            const product = await this.productRepository.findOneBy({ _id: new ObjectId(id) } as any)
            if (!product) {
                return { error: "Product not found" };
            }
            return { product };
        } catch (error) {
            return { error: "Error fetching product", details: error.message };
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const { productName, price, productDescription, productImageUrl, category, stockQuantity } = request.body
            if (!(productName && price && productDescription && category && stockQuantity)) {
                return { error: "Error! Missing required fields" };
            }
            const product = this.productRepository.create({
                productName,
                price,
                productDescription,
                productImageUrl: productImageUrl || null,
                category,
                stockQuantity,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            const savedProduct = await this.productRepository.save(product)
            return { message: "Product created successfully", product: savedProduct };
        } catch (error) {
            return { error: "Error creating product", details: error.message };
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id
            const updateData = request.body
            const product = await this.productRepository.findOneBy({ _id: new ObjectId(id) } as any)
            if (!product) {
                return { error: "Product not found" };
            }
            Object.assign(product, updateData, { updatedAt: new Date() })
            const updatedProduct = await this.productRepository.save(product)
            return { message: "Product updated successfully", product: updatedProduct };
        } catch (error) {
            return { error: "Error updating product", details: error.message };
        }
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id
            const product = await this.productRepository.findOneBy({ id: new ObjectId(id) })
            if (!product) {
                return { error: "Product not found" };
            }
            await this.productRepository.remove(product)
            return { message: "Product deleted successfully" };
        } catch (error) {
            return { error: "Error deleting product", details: error.message };
        }
    }
}
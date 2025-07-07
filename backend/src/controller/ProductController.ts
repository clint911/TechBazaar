import { Request, Response, NextFunction } from "express"
import { AppDataSource } from "../data-source"
import { Product } from "../entity/Product"
import { ObjectId } from "mongodb"

export class ProductController {
    private productRepository = AppDataSource.getRepository(Product)

    async all(request: Request, response: Response, next: NextFunction) {
        // try {
        //     const products = await this.productRepository.find()
        //     return response.status(200).json({ products })
        // } catch (error) {
        //     return response.status(500).json({ message: "Error fetching products", error: error.message })
        // }

        try {
            const { category } = request.query;

            console.log("Received category:", category);

            const filter: any = {};

            if (category) {
                filter.category = category;
            }

            const products = await this.productRepository.find({ where: filter });

            return response.status(200).json({ products });
        } catch (error) {
            console.error("Error fetching products:", error);
            return response.status(500).json({
                message: "Error fetching products",
                error: error.message,
            });
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id

            if (!ObjectId.isValid(id)) {
                return response.status(400).json({
                    message: "Invalid product ID format",
                });
            }

            const product = await this.productRepository.findOneBy({ _id: new ObjectId(id) } as any)

            if (!product) {
                return response.status(404).json({ message: "Product not found" })
            }

            return response.status(200).json({ product })
        } catch (error) {
            return response.status(500).json({ message: "Error fetching product", error: error.message })
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const { productName, price, productDescription, productImageUrl, category, stockQuantity } = request.body

            // Validation
            if (!(productName && price && productDescription && category && stockQuantity)) {
                return response.status(400).json({ message: "Error! Missing required fields" })
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
            return response.status(201).json({ message: "Product created successfully", product: savedProduct })
        } catch (error) {
            return response.status(500).json({ message: "Error creating product", error: error.message })
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id
            const updateData = request.body

            const product = await this.productRepository.findOneBy({ id: new ObjectId(id) })


            if (!product) {
                return response.status(404).json({ message: "Product not found" })
            }

            // Update the product
            Object.assign(product, updateData, { updatedAt: new Date() })
            const updatedProduct = await this.productRepository.save(product)

            return response.status(200).json({ message: "Product updated successfully", product: updatedProduct })
        } catch (error) {
            return response.status(500).json({ message: "Error updating product", error: error.message })
        }
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id

            const product = await this.productRepository.findOneBy({ id: new ObjectId(id) })

            if (!product) {
                return response.status(404).json({ message: "Product not found" })
            }

            await this.productRepository.remove(product)
            return response.status(200).json({ message: "Product deleted successfully" })
        } catch (error) {
            return response.status(500).json({ message: "Error deleting product", error: error.message })
        }
    }
}
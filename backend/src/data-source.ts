import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Product } from "./entity/Product"
import { Order } from "./entity/Order"
import { Cart } from "./entity/Cart"
import { CartItem } from "./entity/CartItem"
import { OrderItem } from "./entity/OrderItem"
import * as dotenv from "dotenv"

// Load environment variables
dotenv.config()

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: "mongodb://localhost:27017/techbazaar",
    synchronize: true,
    logging: false,
    entities: [User, Product, Cart, CartItem, Order, OrderItem],
    migrations: [],
    subscribers: [],
})

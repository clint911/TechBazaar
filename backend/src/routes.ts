import { UserController } from "./controller/UserController"
import { ProductController } from "./controller/ProductController"
import { CartController } from "./controller/CartController"
import { OrderController } from "./controller/OrderController"

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
},
{
    method: "post",
    route: "/api/auth/register",
    controller: UserController,
    action: "register"
},
{
    method: "post",
    route: "/api/auth/login",
    controller: UserController,
    action: "login"
},
{
    method: "get",
    route: "/api/products",
    controller: ProductController,
    action: "all"
},
{
    method: "get",
    route: "/api/products/:id",
    controller: ProductController,
    action: "one"
},
{
    method: "post",
    route: "/api/products",
    controller: ProductController,
    action: "create"
},
{
    method: "put",
    route: "/api/products/:id",
    controller: ProductController,
    action: "update"
},
{
    method: "delete",
    route: "/api/products/:id",
    controller: ProductController,
    action: "delete"
},
{
    method: "get",
    route: "/api/cart",
    controller: CartController,
    action: "getCart"
},
{
    method: "post",
    route: "/api/cart/add",
    controller: CartController,
    action: "addToCart"
},
{
    method: "put",
    route: "/api/cart/update-quantity",
    controller: CartController,
    action: "updateQuantity"
},
{
    method: "delete",
    route: "/api/cart/remove",
    controller: CartController,
    action: "removeFromCart"
},
{
    method: "get",
    route: "/api/orders",
    controller: OrderController,
    action: "getOrders"
},
{
    method: "post",
    route: "/api/orders/create",
    controller: OrderController,
    action: "createOrder"
},
{
    method: "get",
    route: "/api/orders/:id",
    controller: OrderController,
    action: "getOrderDetails"
},
{
    method: "put",
    route: "/api/orders/:id",
    controller: OrderController,
    action: "updateOrder"
},
{
    method: "delete",
    route: "/api/orders/:id",
    controller: OrderController,
    action: "cancelOrder"
},
{
    method: "get",
    route: "/api/user/profile",
    controller: UserController,
    action: "profile"
}
]
# TechBazaar Backend API

A comprehensive e-commerce backend API built with TypeScript, Express.js, TypeORM, and MongoDB.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Docker and Docker Compose
- MongoDB (via Docker)

### Installation & Setup

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd backend
   npm install
   ```

2. **Start MongoDB**
   ```bash
   docker-compose up -d
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Run the application**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm run prod
   ```

The API will be available at `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:3000
```

### Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 🔐 Authentication Endpoints

### Register User
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "userName": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "token": "jwt-token-here"
}
```

**Status Codes:**
- `201` - User created successfully
- `400` - Missing fields or user already exists

---

### Login User
```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt-token-here",
  "userId": "user-id",
  "role": "normal_user"
}
```

**Status Codes:**
- `200` - Login successful
- `400` - Invalid credentials

---

### Get User Profile
```http
GET /api/user/profile
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "user": {
    "id": "user-id",
    "userName": "string",
    "email": "string",
    "role": "normal_user"
  }
}
```

**Status Codes:**
- `200` - Profile retrieved successfully
- `401` - Unauthorized
- `404` - User not found

---

## 🛍️ Product Management

### Get All Products
```http
GET /api/products
```

**Response:**
```json
{
  "products": [
    {
      "id": "product-id",
      "productName": "string",
      "price": 99.99,
      "productDescription": "string",
      "category": "computers|laptops|keyboards|tablets",
      "stockQuantity": 10,
      "productImageUrl": "string|null",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Get Single Product
```http
GET /api/products/{id}
```

**Parameters:**
- `id` (string) - Product ID

**Response:**
```json
{
  "product": {
    "id": "product-id",
    "productName": "string",
    "price": 99.99,
    "productDescription": "string",
    "category": "computers",
    "stockQuantity": 10,
    "productImageUrl": "string|null",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Create Product
```http
POST /api/products
```

**Request Body:**
```json
{
  "productName": "string",
  "price": 99.99,
  "productDescription": "string",
  "category": "computers|laptops|keyboards|tablets",
  "stockQuantity": 10,
  "productImageUrl": "string"
}
```

**Response:**
```json
{
  "message": "Product created successfully",
  "product": {
    "id": "product-id",
    "productName": "string",
    "price": 99.99,
    "productDescription": "string",
    "category": "computers",
    "stockQuantity": 10,
    "productImageUrl": "string",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Update Product
```http
PUT /api/products/{id}
```

**Parameters:**
- `id` (string) - Product ID

**Request Body:**
```json
{
  "productName": "string",
  "price": 99.99,
  "productDescription": "string",
  "category": "computers",
  "stockQuantity": 10,
  "productImageUrl": "string"
}
```

**Response:**
```json
{
  "message": "Product updated successfully",
  "product": {
    "id": "product-id",
    "productName": "string",
    "price": 99.99,
    "productDescription": "string",
    "category": "computers",
    "stockQuantity": 10,
    "productImageUrl": "string",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Delete Product
```http
DELETE /api/products/{id}
```

**Parameters:**
- `id` (string) - Product ID

**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

---

## 🛒 Shopping Cart

### Get User Cart
```http
GET /api/cart
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "cart": {
    "id": "cart-id",
    "userId": "user-id",
    "totalPrice": 299.97,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "isActive": true
  },
  "cartItems": [
    {
      "id": "cart-item-id",
      "cartId": "cart-id",
      "productId": "product-id",
      "quantity": 2,
      "product": {
        "id": "product-id",
        "productName": "string",
        "price": 99.99,
        "productDescription": "string",
        "category": "computers",
        "stockQuantity": 8,
        "productImageUrl": "string"
      }
    }
  ]
}
```

---

### Add Product to Cart
```http
POST /api/cart/add
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "productId": "product-id",
  "quantity": 2
}
```

**Response:**
```json
{
  "message": "Product added to cart successfully",
  "cart": {
    "id": "cart-id",
    "userId": "user-id",
    "totalPrice": 299.97,
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Update Cart Item Quantity
```http
PUT /api/cart/update-quantity
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "productId": "product-id",
  "quantity": 3
}
```

**Response:**
```json
{
  "message": "Quantity updated successfully",
  "cart": {
    "id": "cart-id",
    "userId": "user-id",
    "totalPrice": 449.95,
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Remove Product from Cart
```http
DELETE /api/cart/remove
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "productId": "product-id"
}
```

**Response:**
```json
{
  "message": "Product removed from cart successfully",
  "cart": {
    "id": "cart-id",
    "userId": "user-id",
    "totalPrice": 199.98,
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## 📦 Order Management

### Get User Orders
```http
GET /api/orders
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Response:**
```json
{
  "orders": [
    {
      "id": "order-id",
      "userId": "user-id",
      "totalPrice": 299.97,
      "totalQuantity": 3,
      "shippingAddress": "string",
      "status": "pending|processing|shipped|delivered|cancelled",
      "paymentMethod": "crypto|credit_card|debit_card|paypal|stripe|cash_on_delivery|bank_transfer|other",
      "paymentStatus": "pending|paid|failed|refunded",
      "paymentId": "string",
      "paymentAmount": 299.97,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z",
      "orderItems": [
        {
          "id": "order-item-id",
          "orderId": "order-id",
          "productId": "product-id",
          "quantity": 2,
          "price": 99.99,
          "product": {
            "id": "product-id",
            "productName": "string",
            "price": 99.99,
            "productDescription": "string",
            "category": "computers"
          }
        }
      ]
    }
  ]
}
```

---

### Create Order from Cart
```http
POST /api/orders/create
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Request Body:**
```json
{
  "shippingAddress": "string",
  "paymentMethod": "crypto|credit_card|debit_card|paypal|stripe|cash_on_delivery|bank_transfer|other"
}
```

**Response:**
```json
{
  "message": "Order created successfully",
  "order": {
    "id": "order-id",
    "userId": "user-id",
    "totalPrice": 299.97,
    "totalQuantity": 3,
    "shippingAddress": "string",
    "status": "pending",
    "paymentMethod": "credit_card",
    "paymentStatus": "pending",
    "paymentId": "",
    "paymentAmount": 299.97,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Get Order Details
```http
GET /api/orders/{id}
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Parameters:**
- `id` (string) - Order ID

**Response:**
```json
{
  "order": {
    "id": "order-id",
    "userId": "user-id",
    "totalPrice": 299.97,
    "totalQuantity": 3,
    "shippingAddress": "string",
    "status": "pending",
    "paymentMethod": "credit_card",
    "paymentStatus": "pending",
    "paymentId": "string",
    "paymentAmount": 299.97,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z",
    "orderItems": [
      {
        "id": "order-item-id",
        "orderId": "order-id",
        "productId": "product-id",
        "quantity": 2,
        "price": 99.99,
        "product": {
          "id": "product-id",
          "productName": "string",
          "price": 99.99,
          "productDescription": "string",
          "category": "computers"
        }
      }
    ]
  }
}
```

---

### Update Order
```http
PUT /api/orders/{id}
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Parameters:**
- `id` (string) - Order ID

**Request Body:**
```json
{
  "status": "processing|shipped|delivered",
  "paymentStatus": "paid|failed|refunded",
  "paymentId": "string"
}
```

**Response:**
```json
{
  "message": "Order updated successfully",
  "order": {
    "id": "order-id",
    "status": "processing",
    "paymentStatus": "paid",
    "paymentId": "string",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

### Cancel Order
```http
DELETE /api/orders/{id}
```

**Headers:**
```
Authorization: Bearer <jwt-token>
```

**Parameters:**
- `id` (string) - Order ID

**Response:**
```json
{
  "message": "Order cancelled successfully",
  "order": {
    "id": "order-id",
    "status": "cancelled",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## 🔧 Legacy User Management Endpoints

### Get All Users
```http
GET /users
```

### Get User by ID
```http
GET /users/{id}
```

### Create User
```http
POST /users
```

### Delete User
```http
DELETE /users/{id}
```

---

## 📊 Data Models

### User
```typescript
{
  id: ObjectId
  userName: string
  email: string
  password: string
  role: "admin_user" | "normal_user"
  createdAt: Date
  updatedAt: Date
}
```

### Product
```typescript
{
  id: ObjectId
  productName: string
  price: number
  productDescription: string
  category: "computers" | "laptops" | "keyboards" | "tablets"
  stockQuantity: number
  productImageUrl: string | null
  createdAt: Date
  updatedAt: Date
}
```

### Cart
```typescript
{
  id: ObjectId
  userId: ObjectId
  totalPrice: number
  createdAt: Date
  updatedAt: Date
  isActive: boolean
}
```

### CartItem
```typescript
{
  id: ObjectId
  cartId: ObjectId
  productId: ObjectId
  quantity: number
}
```

### Order
```typescript
{
  id: ObjectId
  userId: ObjectId
  totalPrice: number
  totalQuantity: number
  shippingAddress: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentMethod: "crypto" | "credit_card" | "debit_card" | "paypal" | "stripe" | "cash_on_delivery" | "bank_transfer" | "other"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  paymentId: string
  paymentAmount: number
  createdAt: Date
  updatedAt: Date
}
```

### OrderItem
```typescript
{
  id: ObjectId
  orderId: ObjectId
  productId: ObjectId
  quantity: number
  price: number
}
```

---

## 🛠️ Environment Variables

Create a `.env` file with the following variables:

```env
# Environment
NODE_ENV=development

# Database Configuration
DB_TYPE=sqlite
DB_DATABASE=techbazaar.db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=3000

# MongoDB Configuration (for production)
MONGODB_URI=mongodb://localhost:27017/techbazaar
```

---

## 🚀 Available Scripts

- `npm start` - Start the application
- `npm run dev` - Start in development mode
- `npm run prod` - Start in production mode
- `npm run typeorm` - Run TypeORM CLI commands

---

## 🔒 Security Features

- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt password encryption
- **Input Validation** - Comprehensive request validation
- **Error Handling** - Proper error responses and logging

---

## 📝 Error Responses

All endpoints return consistent error responses:

```json
{
  "message": "Error description",
  "error": "Detailed error message (in development)"
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

## 📄 License

This project is licensed under the MIT License.

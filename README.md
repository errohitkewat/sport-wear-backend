
---

# 6. README for backend repo

`README.md` me ye daal do:

```md
# SportWear Backend

Backend API for a modern sportswear e-commerce website with authentication, product management, order management, and admin controls.

## Features

- User registration and login
- JWT authentication
- Protected routes
- Admin-only routes
- Product CRUD
- Order creation
- User order history
- Admin order management
- MongoDB integration

## Tech Stack

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- JWT
- bcryptjs

## API Modules

### Auth
- Register user
- Login user
- Get current user

### Products
- Get all products
- Get single product
- Admin add product
- Admin update product
- Admin delete product

### Orders
- Create order
- Get logged-in user orders
- Admin get all orders
- Admin update order status

## Setup

```bash
npm install
npm run dev
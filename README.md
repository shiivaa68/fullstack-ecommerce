# 🛒 E-Commerce Backend (Node.js + TypeScript)

This is the backend of a full-stack **E-commerce application** built with **Node.js, Express, TypeScript, and PostgreSQL**.  
The goal of this project is to demonstrate clean architecture, REST API design, authentication, database modeling, and testing.  

---

## 🚀 Features

- User authentication (JWT, bcrypt for password hashing)
- Product management (CRUD operations)
- Cart and order system
- PostgreSQL database with Sequelize ORM
- Unit & integration tests with Jest + Supertest
- Follows clean code practices and modular structure
- Environment variables with `.env`  

---

## 🛠️ Tech Stack

- **Backend Framework:** Node.js, Express
- **Language:** TypeScript
- **Database:** PostgreSQL + Sequelize
- **Authentication:** JWT, bcrypt
- **Testing:** Jest, Supertest
- **Dev Tools:** Nodemon / ts-node / ESLint / Prettier

---

---

## ⚙️ Setup & Installation

1. Clone the repository:

    ```bash
   git clonehttps://github.com/shiivaa68/fullstack-ecommerce.git
   cd backend-ecommerce

2.Install dependencies:
npm install
3.Configure environment variables:
Copy .env.example to .env

Update database credentials and JWT secret

4.Run the development server:
npm run dev
5.Build for production:
npm run build
npm start

Running Tests
npm run test

Roadmap

 User authentication (Register / Login)

 Product CRUD

 Shopping cart & orders

 Payment integration

 Dockerize backend

 Deploy to AWS

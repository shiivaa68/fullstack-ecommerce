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
Create a .env file in the root directory
//# Application
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret

//# Database (Postgres)
DB_URL=postgres://ecommerce_user:strongpassword@localhost:5434/ecommerce_db
4. Run Database
Make sure Postgres is running. Example with Docker:
docker run --name ecommerce-db \
  -e POSTGRES_USER=ecommerce_user \
  -e POSTGRES_PASSWORD=strongpassword \
  -e POSTGRES_DB=ecommerce_db \
  -p 5434:5432 \
  -d postgres

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

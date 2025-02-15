# Notes API - Documentation

## Overview
A RESTful API for managing personal notes, built with Node.js, Express, TypeScript, PostgreSQL, and JWT Authentication.

---

## Table of Contents
- [Features](#features)
- [Installation & Setup](#installation--setup)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
  - [Authentication](#authentication)
  - [Notes](#notes)
- [Running the Project](#running-the-project)
- [Swagger API Documentation](#swagger-api-documentation)

---

## Features
✔ User Registration & Login with JWT Authentication  
✔ Secure CRUD Operations for Notes  
✔ Protected Routes with Authentication Middleware  
✔ PostgreSQL as the Database  
✔ TypeScript for a scalable and maintainable codebase  
✔ API Documentation with Swagger  
✔ Clean Architecture (Controllers, Services, Repositories, Models)  

---

## 🛠 Installation & Setup

### 1. Clone the Repository
```sh
git clone https://github.com/your-username/notes-api.git
cd notes-api
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up PostgreSQL
Create the database:
```sql
CREATE DATABASE notes_db;
CREATE USER notes_user WITH ENCRYPTED PASSWORD 'yourpassword';
GRANT ALL PRIVILEGES ON DATABASE notes_db TO notes_user;
```

### 4. Configure `.env` File
Create a `.env` file in the root directory and add:
```env
PORT=5000
DATABASE_URL=postgres://notes_user:yourpassword@localhost:5432/notes_db
JWT_SECRET=your_secret_key
REDIS_URL=redis://localhost:6379
```

### 5. Run Database Migrations
```sh
npm run migrate
```

### 6. Start the Server
```sh
npm run dev
```
The server will be running on:  
**http://localhost:5000**

---

## Project Structure
```
src/
│── config/            # Configuration files (DB, Redis, Swagger)
│── controllers/       # Express route handlers
│── middleware/        # Authentication & validation middleware
│── models/           # TypeScript models
│── repositories/      # Data access layer
│── routes/           # API route definitions
│── services/         # Business logic layer
│── types/            # Custom TypeScript type definitions
│── index.ts          # Application entry point
.env                  # Environment variables
package.json          # Project metadata
```

---

## API Documentation

### Authentication
| Endpoint      | Method | Description         | Protected |
|--------------|--------|---------------------|-----------|
| `/api/auth/register` | `POST` | Register a new user | No |
| `/api/auth/login` | `POST` | Log in and get a JWT token | No |

### Notes
| Endpoint | Method | Description | Protected |
|----------|--------|-------------|-----------|
| `/api/notes` | `POST` | Create a new note | Yes |
| `/api/notes` | `GET` | Get all notes for the logged-in user | Yes |
| `/api/notes/{id}` | `GET` | Get a specific note by ID | Yes |
| `/api/notes/{id}` | `PUT` | Update a note | Yes |
| `/api/notes/{id}` | `DELETE` | Delete a note | Yes |

---

## Swagger API Documentation
To access API documentation via Swagger UI:
```
http://localhost:5000/api-docs
```




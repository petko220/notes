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







# Notes App - Frontend Documentation

## Overview
This is the **frontend** of the Notes App, a React-based web application built using **Vite, TypeScript, Material UI, and React Router**. It allows users to create, edit, delete, and manage personal notes. Authentication is implemented to ensure user data security.

---


## 🛠️ Technologies Used
- **React** (Frontend library)
- **TypeScript** (Static typing)
- **Vite** (Frontend tooling)
- **Material UI** (UI framework)
- **React Router** (Navigation)
- **React Hook Form** (Form management)
- **Yup** (Form validation)
- **Axios** (HTTP requests handling)

---

## 🔗 API Integration
The frontend communicates with the backend through API services located in `src/api/`. Below are the main API calls:

### **Authentication (`authService.ts`):**
- `loginUser(email, password)`: Logs in a user and stores a token.
- `registerUser(name, email, password)`: Registers a new user.
- `logoutUser()`: Logs out a user by removing the token.
- `isAuthenticated()`: Checks if the user is logged in.

### **Notes API (`noteService.ts`):**
- `fetchNotes(token)`: Retrieves all notes.
- `createNote(token, title, content)`: Creates a new note.
- `updateNote(token, id, title, content)`: Updates an existing note.
- `deleteNote(token, id)`: Deletes a note.

---

## 🏗️ Features
### **Authentication**
✅ User registration and login.  
✅ Token-based authentication.  
✅ Logout functionality.

### **Notes Management**
✅ Create new notes.  
✅ Edit existing notes.  
✅ Delete notes.  
✅ View a list of all saved notes.  
✅ Floating action button for quick note creation.

### **User Experience**
✅ Material UI theming and responsiveness.  
✅ Form validation using **Yup** and **React Hook Form**.  
✅ Snackbar notifications for feedback.  
✅ Dialog confirmation for delete actions.

---

## 🚀 Running the Project
### **1️⃣ Install Dependencies**

npm install
```

### **2️⃣ Start the Development Server**
```sh
npm run dev
```
The app should now be available at **http://localhost:5173**


## 🔄 Navigation & Routing
The app uses **React Router** for navigation.

| Route             | Description                        | Access   |
|------------------|--------------------------------|----------|
| `/`              | Home Page                        | Public   |
| `/login`         | User login page                 | Public   |
| `/register`      | User registration page          | Public   |
| `/notes`         | Main notes page                 | Private  |
| `/notes/create`  | Page for creating a new note    | Private  |
| `/notes/edit/:id`| Page for editing a specific note | Private  |

🔒 **Private routes** are only accessible to authenticated users.




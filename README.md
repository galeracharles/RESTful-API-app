# RESTful-API-app

This is a Node.js application that provides a RESTful API for user authentication, user management, and product management. It uses Express.js as the web framework and integrates with MongoDB and PostgreSQL databases. The API endpoints are documented using Swagger.

## Installation

1. Install the dependencies:

```
cd <project-folder>
npm install
```
2. Configure the application

- MongoDB: Update the **`MONGO_URL`** variable in index.ts with your MongoDB connection string.
- PostgreSQL: Update the database connection details in **`db/products.ts`** file.

3. Start the application

```
npm start
```

## API Documentation

The API endpoints are documented using Swagger. After starting the application, you can access the Swagger documentation at **'http://localhost:8080/api-docs'**.

## Endpoints

1. **User Authentication:**
- POST **'/auth/register'**: Register a new user.
- POST **'/auth/login'**: User login.

2. **User Management:**
- GET **'/users'**: Get all users.
- DELETE **'/users/:id'**: Delete a user.
- PATCH **'/users/:id'**: Update a user's username.

3. **Product Management:**
- POST **'/users/:id/products'**: Upload a products file.
- GET **'/users/:id/products/'**: productId: Get a product by ID.

## Dependencies

The main dependencies used in this application are:

- Express.js: Web framework for building the RESTful API.
- Mongoose: MongoDB object modeling for data interaction.
- PostgreSQL: PostgreSQL client library for interacting with the database.
- Swagger UI Express: Middleware for serving Swagger UI documentation.
- Multer: Middleware for handling file uploads.


import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import router from "./router";
import mongoose from "mongoose";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import path from "path";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const MONGO_URL =
  "mongodb+srv://karolG:dC3ITQoEmwan1zWb@cluster0.pw141w2.mongodb.net/?retryWrites=true&w=majority";

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("db Connected");
  } catch (error) {
    console.error(error);
  }
};

connectToDatabase();

const server = http.createServer(app);

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API Documentation",
      version: "1.0.0",
      description:
        "This API provides endpoints to interact with various features of the application. It allows you to perform actions related to user authentication, user management, and product management. See below for details on each endpoint and their request/response structures.",
      contact: {
        email: "charles.galera.it@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8080",
      },
    ],
  },
  apis: [
    path.join(__dirname, "router", "authentication.ts"),
    path.join(__dirname, "router", "users.ts"),
  ],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/", router());

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080/");
});

import express from "express";
import { deleteUser, getAllUsers, updateUserName } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares";
import multer from "multer";
import path from "path";
import { getProductById, postProducts } from "../controllers/products";

const upload = multer({ dest: path.join(__dirname, "../data/") });

export default (router: express.Router) => {
  /**
   * @swagger
   * /users:
   *   get:
   *     summary: get all Users
   *     tags:
   *       - Users
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: OK
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   */
  router.get("/users", isAuthenticated, getAllUsers);

  /**
   * @swagger
   * /users/{id}:
   *   delete:
   *     summary: delete User
   *     tags:
   *       - Users
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: User ID
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: OK
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   */
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);

  /**
   * @swagger
   * /users/{id}:
   *   patch:
   *     summary: update Username
   *     tags:
   *       - Users
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: User ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: OK
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   */
  router.patch("/users/:id", isAuthenticated, isOwner, updateUserName);

  /**
   * @swagger
   * /users/{id}/products:
   *   post:
   *     summary: add products file by stream
   *     tags:
   *       - Users
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: User ID
   *     requestBody:
   *       required: true
   *       content:
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               file:
   *                 type: file
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: OK
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   */
  router.post(
    "/users/:id/products",
    isAuthenticated,
    isOwner,
    upload.single("file"),
    postProducts
  );

  /**
   * @swagger
   * /users/{id}/products/{productId}:
   *   get:
   *     summary: Get product by ID
   *     tags:
   *        - Users
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: User ID
   *       - in: path
   *         name: productId
   *         required: true
   *         schema:
   *           type: string
   *         description: Product ID
   *     responses:
   *       200:
   *         description: OK
   *       400:
   *         description: Bad Request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Not Found
   */
  router.get(
    "/users/:id/products/:productId",
    isAuthenticated,
    isOwner,
    getProductById
  );
};

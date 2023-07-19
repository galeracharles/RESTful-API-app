import { DataHandler } from "../handlers/dataHandler";
import express from "express";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints related to user
 */

/**
 * @swagger
 * /users/{id}/products:
 *   post:
 *     summary: Add products file by stream
 *     tags: [Users]
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
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 */
export const postProducts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const file = req.file;

    if (!file) {
      return res.sendStatus(400);
    }

    const data = new DataHandler();
    await data.processFile(file);

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

/**
 * @swagger
 * /users/{id}/products/{productId}:
 *   get:
 *     summary: Get product by ID
 *     tags: [Users]
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
export const getProductById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const productId = req.params.productId;

    const data = new DataHandler();
    const product = await data.getProductById(productId);

    if (!product) {
      return res.sendStatus(400);
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

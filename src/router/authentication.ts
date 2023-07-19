import express from "express";
import { login, register } from "../controllers/authentication";

export default (router: express.Router) => {
  /**
   * @swagger
   * /auth/register:
   *   post:
   *     summary: User register
   *     tags:
   *       - Authentication
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *               username:
   *                 type: string
   *     responses:
   *       200:
   *         description: OK
   *       400:
   *         description: Bad Request
   */
  router.post("/auth/register", register);

  /**
   * @swagger
   * /auth/login:
   *   post:
   *     summary: User login
   *     tags:
   *       - Authentication
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       200:
   *         description: OK
   *       400:
   *         description: Bad Request
   *       403:
   *         description: Forbidden
   */
  router.post("/auth/login", login);
};

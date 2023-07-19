import express from "express";
import { deleteUserById, getUserById, getUsers } from "../db/users";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints related to user
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: get all Users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 */
export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: delete User
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: User ID 
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 */
export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);

    return res.json(deletedUser);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

/**
 * @swagger
 * /users/{id}:
 *   patch:
 *     summary: update Username
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
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 */
export const updateUserName = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);

    if (!user) {
      return res.sendStatus(400);
    }

    user.username = username;
    await user.save();

    return res.status(200).json(user).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

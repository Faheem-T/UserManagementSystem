import { Router } from "express";
import { authenticationMiddleware } from "../helpers/authUser.js";
import { user_home_get } from "../controllers/userController.js";

const router = Router();

router.get("/", authenticationMiddleware(), user_home_get);

export default router;

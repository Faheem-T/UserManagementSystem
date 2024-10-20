import { Router } from "express";
import { user_logout_get } from "../controllers/userController.js";
import { authenticationMiddleware } from "../helpers/authUser.js";

const router = Router();

router.get("/", authenticationMiddleware(), user_logout_get);

export default router;

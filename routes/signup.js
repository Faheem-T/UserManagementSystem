import { Router } from "express";
import { User } from "../models/userModel.js";
import { hashPassword } from "../helpers/hashPassword.js";

import {
  user_signup_get,
  user_signup_post,
} from "../controllers/userController.js";

const router = Router();

router.get("/", user_signup_get);

router.post("/", user_signup_post);

export default router;

/* TODO:
  1) Validate data using validator
*/

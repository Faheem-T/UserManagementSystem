import { Router } from "express";
import passport from "passport";

import {
  user_delete_get,
  user_home_get,
  user_login_get,
  user_login_post,
  user_logout_get,
  user_signup_get,
  user_signup_post,
} from "../controllers/userController.js";

import { authenticationMiddleware } from "../helpers/authUser.js";

import "../strategies/local-strategy.js";

const router = Router();

// signup
router.get("/signup", user_signup_get);
router.post("/signup", user_signup_post);

// login
router.post(
  "/login",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  user_login_post
);

router.get("/login", user_login_get);

// logout
router.get("/logout", authenticationMiddleware(), user_logout_get);

// home
router.get("/home", authenticationMiddleware(), user_home_get);

// delete user
router.get("/deleteUser/:id", authenticationMiddleware(), user_delete_get);

export default router;

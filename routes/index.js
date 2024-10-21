import { Router } from "express";
import passport from "passport";

import {
  user_create_get,
  user_create_post,
  user_delete_get,
  user_edit_get,
  user_edit_post,
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

// edit user
router.get("/editUser/:id", authenticationMiddleware(), user_edit_get);
router.post("/editUser", authenticationMiddleware(), user_edit_post);

// create user
router.get("/createUser", authenticationMiddleware(), user_create_get);
router.post("/createUser", authenticationMiddleware(), user_create_post);

export default router;

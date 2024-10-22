import { Router } from "express";
import passport from "passport";

import {
  user_create_get,
  user_create_post,
  user_delete_get,
  user_edit_get,
  user_edit_post,
  user_home_get,
  user_home_post,
  user_login_get,
  user_login_post,
  user_logout_post,
  user_signup_get,
  user_signup_post,
} from "../controllers/userController.js";

import { authenticationMiddleware } from "../helpers/authUser.js";

import "../strategies/local-strategy.js";
import { checkSchema } from "express-validator";
import {
  editUserValidation,
  loginValidation,
  searchValidation,
  userFormValidation,
} from "../helpers/validationScemas.js";
import { validationErrorLoggerMiddleware } from "../helpers/validationErrorLogger.js";

const router = Router();

// signup
router.get("/signup", user_signup_get);
router.post(
  "/signup",
  checkSchema(userFormValidation),
  validationErrorLoggerMiddleware,
  user_signup_post
);

// login
router.post(
  "/login",
  checkSchema(loginValidation),
  validationErrorLoggerMiddleware,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  user_login_post
);

router.get("/login", user_login_get);

// logout
router.post("/logout", authenticationMiddleware(), user_logout_post);

// home
router.get("/home", authenticationMiddleware(), user_home_get);
// home post => user search
router.post(
  "/home",
  authenticationMiddleware(),
  checkSchema(searchValidation),
  validationErrorLoggerMiddleware,
  user_home_post
);

// delete user
router.get("/deleteUser/:id", authenticationMiddleware(), user_delete_get);

// edit user
router.get("/editUser/:id", authenticationMiddleware(), user_edit_get);
router.post(
  "/editUser",
  authenticationMiddleware(),
  checkSchema(editUserValidation),
  validationErrorLoggerMiddleware,
  user_edit_post
);

// create user
router.get("/createUser", authenticationMiddleware(), user_create_get);
router.post(
  "/createUser",
  authenticationMiddleware(),
  checkSchema(userFormValidation),
  validationErrorLoggerMiddleware,
  user_create_post
);

export default router;

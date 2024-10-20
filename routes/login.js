import { Router } from "express";
import passport from "passport";
import "../strategies/local-strategy.js";
import {
  user_login_get,
  user_login_post,
} from "../controllers/userController.js";

const router = Router();

router.post(
  "/",
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "/login",
  }),
  user_login_post
);

router.get("/", user_login_get);

export default router;

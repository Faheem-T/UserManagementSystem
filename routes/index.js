import { Router } from "express";

import signupRoute from "./signup.js";
import homeRoute from "./home.js";
import loginRoute from "./login.js";
import adminPageRoute from "./adminPage.js";
import userPageRoute from "./userPage.js";

const router = Router();

router.use("/signup", signupRoute);
router.use("/home", homeRoute);
router.use("/userpage", userPageRoute);
router.use("/adminpage", adminPageRoute);
router.use("/login", loginRoute);

export default router;

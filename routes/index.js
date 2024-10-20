import { Router } from "express";

import signupRoute from "./signup.js";
import homeRoute from "./home.js";
import loginRoute from "./login.js";
import logoutRoute from "./logout.js";

const router = Router();

router.use("/signup", signupRoute);
router.use("/home", homeRoute);
router.use("/login", loginRoute);
router.use("/logout", logoutRoute);

export default router;

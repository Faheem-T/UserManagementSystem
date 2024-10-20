import { Router } from "express";
import { authenticationMiddleware } from "../helpers/authUser.js";

const router = Router();

router.get("/", authenticationMiddleware(), (req, res) => {
  res.render("home");
});

export default router;

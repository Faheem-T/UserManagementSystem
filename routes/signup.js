import { Router } from "express";
import { User } from "../models/userModel.js";
import { hashPassword } from "../helpers/hashPassword.js";

const router = Router();

router.get("/", (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/home");
  res.render("signup");
});

router.post("/", async (req, res) => {
  const { body } = req;
  body.password = hashPassword(body.password);
  const user = new User(body);
  try {
    await user.save();
    res.status(200).redirect("/home");
  } catch (err) {
    console.log(err);
    res.status(400).redirect("/");
  }
});

export default router;

/* TODO:
  1) Validate data using validator
*/

import { Router } from "express";
import passport from "passport";
import "../strategies/local-strategy.js";

const router = Router();

router.post("/", passport.authenticate("local"), (req, res) => {
  console.log(req.user);
  res.status(200).redirect("/home");
});

router.get("/", (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/home");
  res.render("login", { title: "Login" });
});

export default router;

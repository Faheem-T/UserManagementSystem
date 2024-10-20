import { hashPassword } from "../helpers/hashPassword.js";
import { User } from "../models/userModel.js";

export const user_signup_post = async (req, res) => {
  const { body } = req;
  body.password = hashPassword(body.password);
  const user = new User(body);
  try {
    await user.save();
    res.status(200).redirect("/login");
  } catch (err) {
    console.log(err);
    req.flash("error", err.message);
    res.status(400).redirect("/signup");
  }
};

export const user_signup_get = (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/home");
  res.render("signup", { title: "Sign Up", errors: res.locals.error });
};

export const user_login_post = (req, res) => {
  console.log(req.user);
  res.status(200).redirect("/home");
};

export const user_login_get = (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/home");
  res.render("login", { title: "Login", errors: res.locals.error });
};

export const user_home_get = (req, res) => {
  if (req.user.role === "admin") {
    return res.render("adminPage");
  }
  return res.render("userPage");
};

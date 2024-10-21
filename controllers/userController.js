import { hashPassword } from "../helpers/hashPassword.js";
import { User } from "../models/userModel.js";

export const user_signup_post = async (req, res) => {
  const { body } = req;
  body.password = hashPassword(body.password);
  const user = new User(body);
  try {
    await user.save();
    req.flash("success", "User created successfully");
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
  res.render("login", {
    title: "Login",
    errors: res.locals.error,
    success: res.locals.success,
  });
};

export const user_home_get = async (req, res) => {
  const name = req.user.username;
  if (req.user.role === "admin") {
    const users = await User.find({ role: "user" });
    return res.render("adminPage", {
      users,
      name,
      success: res.locals.success,
    });
  }
  return res.render("userPage", { name });
};

export const user_logout_get = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log("error");
      return res.sendStatus(400);
    }
    req.flash("success", "Logged out successfully");
    res.redirect("/login");
  });
};

export const user_delete_get = async (req, res) => {
  if (!(req.user.role === "admin")) res.redirect("/");
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
  } catch (err) {
    req.flash("error", "Error: something went wrong");
    res.status(400);
    res.redirect("/home");
  }
  // send success message to "/home"
  res.status(200);
  req.flash("success", "User deleted successfully");
  res.redirect("/home");
};

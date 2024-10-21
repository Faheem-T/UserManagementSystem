import { hashPassword } from "../helpers/hashPassword.js";
import { User } from "../models/userModel.js";

// Handle user signup on POST
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

// Handle user signup on GET
export const user_signup_get = (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/home");
  res.render("signup", {
    title: "Sign Up",
    action: "/signup",
  });
};

// Handle user login on POST
export const user_login_post = (req, res) => {
  console.log(req.user);
  res.status(200).redirect("/home");
};

// Handle user login on GET
export const user_login_get = (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/home");
  res.render("login", {
    title: "Login",
  });
};

// Handle home on GET
export const user_home_get = async (req, res) => {
  const name = req.user.username;
  if (req.user.role === "admin") {
    let users;
    // req.session.users is empty => a search has not been done
    // so render all users
    if (!req.session.users) {
      users = await User.find({ role: "user" });
    } else {
      // otherwise, render users matching search
      users = req.session.users;
      delete req.session["users"];
    }
    return res.render("adminPage", {
      name,
      users,
    });
  }
  return res.render("userPage", { name });
};

// Handle home on POST
export const user_home_post = async (req, res) => {
  const { searchText } = req.body;
  // render all users if seach is empty
  if (!searchText) return res.redirect("/home");
  const users = await User.find({
    role: "user",
    $or: [
      { name: { $regex: String(searchText) } },
      { email: { $regex: String(searchText) } },
    ],
  });
  req.session.users = users;
  res.redirect("/home");
};

// Handle user logout on post
export const user_logout_post = (req, res) => {
  req.logout((err) => {
    if (err) {
      console.log("error");
      return res.sendStatus(400);
    }
    req.flash("success", "Logged out successfully");
    res.redirect("/login");
  });
};

// Handle user delete on GET
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

// Handle user edit on GET
export const user_edit_get = async (req, res) => {
  if (!(req.user.role === "admin")) res.redirect("/");
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.render("userEdit", { user });
  } catch (err) {
    req.flash("error", "Error: something went wrong");
    res.status(400);
    req.redirect("/home");
  }
};

// Handle user edit on POST
export const user_edit_post = async (req, res) => {
  const { id, username, email } = req.body;
  try {
    await User.findByIdAndUpdate(id, { username, email });
    req.flash("success", "User updated successfully!");
    res.status(200);
    res.redirect("/home");
  } catch (err) {
    req.flash("error", "Error: something went wrong");
    res.status(400);
    req.redirect("/home");
  }
};

// Handle user create on GET
export const user_create_get = (req, res) => {
  res.render("userCreate", { title: "Create new user", action: "/createUser" });
};

// Handle user create on POST
export const user_create_post = async (req, res) => {
  const { body } = req;
  body.password = hashPassword(body.password);
  const user = new User(body);
  try {
    await user.save();
    req.flash("success", "User created successfully");
    res.status(200).redirect("/home");
  } catch (err) {
    console.log(err);
    req.flash("error", err.message);
    res.status(400).redirect("/home");
  }
};

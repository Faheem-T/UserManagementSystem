import express from "express";
import session from "express-session";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import passport from "passport";
import nocache from "nocache";
import flash from "connect-flash";
// Session storage
import MongoStore from "connect-mongo";

import router from "./routes/index.js";

const port = 3000;

import * as url from "url";
import morgan from "morgan";
import path from "path";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

// MongoDB connection
mongoose
  .connect("mongodb://localhost/userManagement")
  .then(console.log("Connected to MongoDB"))
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  session({
    secret: "BIGsecret",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
  })
);
app.use(nocache());

// Setting up flash messages
app.use(flash());
// Storing the error to res.locals.error so
// that it is accessible everywhere in the app
app.use((req, res, next) => {
  res.locals.errors = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// pug config
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// passport initialization
app.use(passport.initialize());
app.use(passport.session());

app.use(router);

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.listen(port, () => {
  console.log(`app running on http://localhost:${port}`);
});

/*
IDEAS
How the app is going to work

main page has - user signup - and - admin signup -
Both are the same but the only difference is that 
  user signup will add "user" to the "role" field 
  admin signup will add "admin" to the "role" field

How can I do this?
  - add different routes for admin and user signup
  - on POSTing to these routes, add the information 
  to database but pass "user" / "admin" according
  to the route for the "role" field.

WAIT... what if
instead of two signup pages, theres just one and 
add a checkbox that says "Admin?".
If this is checked, add "admin" role. 
Else, add "user" role.

*/

/*
HOW TO RENDER HOME PAGE FOR USERS?
a successful login redirects to "/home"
so from "/home" we check:
  if "admin":
    redirect to "/adminpage"
  else:
    redirect to "/userpage"

How to check if "admin"?
  req.user.role

Realized that a better way to do this
is to check the role at "/home" and
render different pages according to role
*/

/*
HOW TO IMPLEMENT SEARCH
I am thinking about a search feature that
makes use of debouncing.
There will be a search bar on top of the
users table. And when something is typed
into the search bar, the users should be
filtered.

Fields to include in filter query:
  - name
  - email

I think I should first implement a normal
search that does not make use of debouncing.
*/

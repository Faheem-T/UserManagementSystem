import express from "express";
import session from "express-session";

const port = 3000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "BIGsecret",
    saveUninitialized: false,
    resave: false,
  })
);

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});

/*
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

*/

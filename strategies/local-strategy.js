import { Strategy } from "passport-local";
import passport from "passport";

import { User } from "../models/userModel.js";
import { compareHash } from "../helpers/hashPassword.js";

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const foundUser = await User.findById(id);
  if (!foundUser) return done(null, false, { message: "User not found" });
  done(null, foundUser);
});

export default passport.use(
  new Strategy(async (username, password, done) => {
    const foundUser = await User.findOne({ username });
    if (!foundUser) return done(null, false, { message: "User not found" });
    if (!compareHash(password, foundUser.password))
      return done(null, false, { message: "Invalid credentials" });
    done(null, foundUser);
  })
);

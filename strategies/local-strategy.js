import { Strategy } from "passport-local";
import { User } from "../models/userModel";
import passport from "passport";

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
    const foundUser = await User.find({ username });
    if (!foundUser) return done(null, false, { message: "User not found" });
    if (foundUser.password !== password)
      return done(null, false, { message: "Invalid credentials" });
    done(null, foundUser);
  })
);

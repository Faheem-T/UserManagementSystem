import { Router } from "express";
import { User } from "../models/userModel.js";
import { compareHash, hashPassword } from "../helpers/hashPassword.js";

// const testingDB = async () => {
//   const user = new User({
//     username: "rifan",
//     displayName: "Rifan",
//     password: "parachute",
//     role: "user",
//   });

//   try {
//     user.password = hashPassword(user.password);
//     await user.save();
//     console.log("user successfully saved");
//   } catch (err) {
//     console.log(err);
//   }
// };
// testingDB()

// const testingHash = async () => {
//   const foundUser = await User.findOne({ username: "rifan" });
//   console.log(compareHash("parachute", foundUser.password));
// };
// testingHash();

const router = Router();

export default router;

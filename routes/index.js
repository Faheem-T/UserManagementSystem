import { Router } from "express";
import { User } from "../models/userModel.js";

// const testingDB = async () => {
//   const user = new User({
//     username: "rifan",
//     displayName: "Rifan",
//     password: "parachute",
//     role: "user",
//   });

//   try {
//     await user.save();
//     console.log("user successfully saved");
//   } catch (err) {
//     console.log(err);
//   }
// };

const router = Router();

export default router;

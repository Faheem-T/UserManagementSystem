import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  email: {
    type: Schema.Types.String,
    required: true,
    unique: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  role: {
    type: Schema.Types.String,
    default: "user",
    enum: ["user", "admin"],
  },
});

export const User = model("User", UserSchema);

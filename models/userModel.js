import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
    unique: true,
  },
  displayName: Schema.Types.String,
  password: {
    type: Schema.Types.String,
    required: true,
  },
  role: {
    type: Schema.Types.String,
    enum: ["user", "admin"],
    required: true,
  },
});

export const User = model("User", UserSchema);

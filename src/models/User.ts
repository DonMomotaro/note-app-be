import { Schema, Types, model } from "mongoose";

interface IUser {
  fullName?: string;
  username: string;
  password: string;
  avatar?: string;
}

const userSchema = new Schema<IUser>(
  {
    fullName: String,
    username: { type: String, required: true },
    password: { type: String, required: true, select: false },
    avatar: String,
  },
  {
    timestamps: true,
  }
);

export const User = model("User", userSchema);

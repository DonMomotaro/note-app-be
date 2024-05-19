import { Schema, Types, model } from "mongoose";

interface INote {
  title: string;
  content: string;
  owner: Types.ObjectId;
}

const noteSchema = new Schema<INote>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Note = model<INote>("Note", noteSchema);

import { Schema, model } from "mongoose";

const PostsSchema = new Schema(
  {
    title: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      default: "",
    },
    author: {
      type: String,
      default: "",
    },
    tags: {
      type: String,
      default: "",
    },
    state: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    collection: "Posts",
  }
);

module.exports = model("Post", PostsSchema);

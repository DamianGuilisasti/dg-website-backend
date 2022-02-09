import { Schema, model } from "mongoose";

const PostsSchema = new Schema(
  {
    title: {
      type: String,
    },
    category: {
      type: String,
    },
    author: {
      type: String,
    },
    tags: {
      type: String,
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


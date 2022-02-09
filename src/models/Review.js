import { Schema, model } from "mongoose";

const ReviewsSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    logo: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },

    state: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    collection: "Reviews",
  }
);

module.exports = model("Reviews", ReviewsSchema);

import { Schema, model } from "mongoose";

const ReviewsSchema = new Schema(
  {
    author: {
      type: String,
      required: true,
      default: "",
    },
    company: {
      type: String,
      required: true,
      default: "",
    },
    text: {
      type: String,
      required: true,
      default: "",
    },
    logo: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
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

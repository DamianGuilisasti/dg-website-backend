import { Schema, model } from "mongoose";

const CallToActionsSchema = new Schema(
  {
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
    link: {
      type: String,
    },
    buttonText: {
      type: String,
    },
    backgroundImg: {
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
    collection: "CallToActions",
  }
);

module.exports = model("CallToActions", CallToActionsSchema);

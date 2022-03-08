import { Schema, model } from "mongoose";

const CallToActionsSchema = new Schema(
  {
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    buttonText: {
      type: String,
      default: "",
    },
    backgroundImg: {
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
    collection: "CallToActions",
  }
);

module.exports = model("CallToActions", CallToActionsSchema);

import { Schema, model } from "mongoose";

const sliderSchema = new Schema(
  {
    logoImg: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },
  },
  {
    timestamps: true,
    collection: "Logos",
  }
);

module.exports = model("Logos", sliderSchema);

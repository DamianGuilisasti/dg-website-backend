import { Schema, model } from "mongoose";

const sliderSchema = new Schema(
  {
    logoImg: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
    collection: "Logos",
  }
);

export default model("Logos", sliderSchema);


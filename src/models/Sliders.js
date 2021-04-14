import { Schema, model } from "mongoose";

const sliderSchema = new Schema(
  {
    sliderImg: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    title: {
      type: String,
    },
    subtitle: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "Sliders",
  }
);

export default model("Slider", sliderSchema);


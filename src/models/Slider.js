import { Schema, model } from "mongoose";

const sliderSchema = new Schema(
  {
    sliderImg: {
      public_id: {
        type: String,
        default: "",
      },
      url: {
        type: String,
        default: "",
      },
    },
    title: {
      type: String,
      default: "",
    },
    subtitle: {
      type: String,
      default: "",
    },
    buttonText: {
      type: String,
      default: "",
    },
    buttonURL: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    collection: "Sliders",
  }
);

module.exports = model("Slider", sliderSchema);

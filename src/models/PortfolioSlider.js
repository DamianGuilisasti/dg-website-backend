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
    buttonText: {
      type: String,
    },
    buttonURL: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "PortfolioSlider",
  }
);

export default model("PortfolioSlider", sliderSchema);

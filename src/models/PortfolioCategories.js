import { Schema, model } from "mongoose";

const PortfolioCategoriesSchema = new Schema(
  {
    name: {
      type: String,
    },
    state: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    collection: "PortfolioCategories",
  }
);

module.exports = model("PortfolioCategories", PortfolioCategoriesSchema);

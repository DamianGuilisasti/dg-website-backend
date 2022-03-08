import { Schema, model } from "mongoose";

const PortfolioSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "PortfolioCategories",
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Clients",
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
      default: "",
    },
    slug: {
      type: String,
      unique: true,
      required: true,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    problem: {
      type: String,
      default: "",
    },
    solution: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
    clientReview: {
      type: String,
      default: "",
    },
    portfolioimages: [
      {
        public_id: {
          type: String,
          default: "",
        },
        url: {
          type: String,
          required: true,
          default: "",
        },
        index: {
          type: String,
          default: "",
        },
      },
    ],
    state: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    collection: "Portfolios",
  }
);

module.exports = model("Portfolios", PortfolioSchema);

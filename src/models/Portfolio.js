import { Schema, model } from "mongoose";

const PortfolioSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: "Clients",
      required: true,
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
    },
    problem: {
      type: String,
    },
    solution: {
      type: String,
    },
    projectType: {
      type: String,
    },
    projectLink: {
      type: String,
    },
    clientReview: {
      type: String,
    },
    portfolioimages: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
        index: {
          type: String,
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

const Portfolios = model("Portfolios", PortfolioSchema);

export default Portfolios;

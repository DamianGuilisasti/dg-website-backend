import { Schema, model } from "mongoose";

const PortfolioSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: "Clients",
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
    proyectType: {
      type: String,
    },
    proyectLink: {
      type: String,
    },
    clientReview: {
      type: String,
    },
    images: [
      {
        public_id: {
          type: String,
        },
        url: {
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

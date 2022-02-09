import { Schema, model } from "mongoose";

const ServicesSchema = new Schema(
  {
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
    shortdescription: {
      type: String,
    },
    description: {
      type: String,
    },
    clientReview: {
      type: String,
    },
    servicesimages: [
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
    projectExample: {
      type: String,
    },
    state: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    collection: "Services",
  }
);

module.exports = model("Services", ServicesSchema);

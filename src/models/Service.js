import { Schema, model } from "mongoose";

const ServicesSchema = new Schema(
  {
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
    shortdescription: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    clientReview: {
      type: String,
      default: "",
    },
    servicesimages: [
      {
        public_id: {
          type: String,
          default: "",
        },
        url: {
          type: String,
          default: "",
        },
        index: {
          type: String,
          default: "",
        },
      },
    ],
    projectExample: {
      type: String,
      default: "",
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

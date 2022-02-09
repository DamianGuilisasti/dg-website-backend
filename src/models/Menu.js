import { Schema, model } from "mongoose";

const MenusSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
    },
    state: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    collection: "Menus",
  }
);

module.exports = model("Menus", MenusSchema);

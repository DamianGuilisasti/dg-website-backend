import { Schema, model } from "mongoose";

const MenusSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      required: true,
      default: "",
    },
    link: {
      type: String,
      required: true,
      default: "",
    },
    order: {
      type: Number,
      default: 0,
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

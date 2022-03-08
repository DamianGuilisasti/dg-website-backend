import { Schema, model } from "mongoose";

const rolSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    collection: "Roles",
  }
);

module.exports = model("Rol", rolSchema);

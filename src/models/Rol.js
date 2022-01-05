import { Schema, model } from "mongoose";

const rolSchema = new Schema(
  {
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "Roles",
  }
);

export default model("Rol", rolSchema);

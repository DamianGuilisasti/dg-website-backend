import { Schema, model } from "mongoose";

const rolSchema = new Schema({
  name: {
    type: String,
  },
});

export default model("rol", rolSchema);

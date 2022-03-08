import { Schema, model } from "mongoose";

const ExpensesSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      required: true,
      default: "",
    },
    price: {
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
    collection: "Expenses",
  }
);

module.exports = model("Expenses", ExpensesSchema);
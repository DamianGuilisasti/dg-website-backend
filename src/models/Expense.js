import { Schema, model } from "mongoose";

const ExpensesSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      required: true,
    },
    price: {
      type: Number,
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
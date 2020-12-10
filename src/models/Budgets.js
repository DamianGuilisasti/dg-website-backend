import { Schema, model } from "mongoose";

const BudgetSchema = new Schema(
  {
    client: {
        type: Schema.Types.ObjectId,
        ref: 'Clients'
    },
    total: {
      type: Number,
    },
    state: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    collection: "Budgets",
  }
);

const Budgets = model("Budgets", BudgetSchema);

export default Budgets;

import { Schema, model } from "mongoose";

const BudgetSchema = new Schema(
  {
    client: {
      type: Schema.Types.ObjectId,
      ref: "Clients",
    },
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "ClientsServices",
      },
    ],
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

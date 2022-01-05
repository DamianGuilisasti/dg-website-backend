import { Schema, model } from "mongoose";

const ClientsServicesSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      required: true,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    serviceType: {
      type: String,
      enum: ["Mensual", "Anual", "Fijo"],
      required: true,
      default: 'Mensual'
    },
    state: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    collection: "ClientsServices",
  }
);

const ClientsServices = model("ClientsServices", ClientsServicesSchema);

export default ClientsServices;

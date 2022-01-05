import { Schema, model } from "mongoose";

const ClientSchema = new Schema(
  {
    name: {
      type: String,
      maxlength: 50,
      required: true,
    },
    lastname: {
      type: String,
      maxlength: 50,
      required: true,
    },
    email: {
      type: String,
      maxlength: 50,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      maxlength: 50,
    },
    company: {
      type: String,
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
    isPaid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: "Clients",
  }
);

const Clients = model("Clients", ClientSchema);

export default Clients;

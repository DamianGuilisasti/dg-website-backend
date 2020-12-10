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
    /*     totalSpend: {
      type: Number,
    }, */
    phone: {
      type: Number,
      maxlength: 50,
    },
    /*     services: [
      {
        service: {
          type: Schema.Types.ObjectId,
          ref: "Services",
        },
        serviceDate: {
          date: Date,
        },
      },
    ], */
    /*     services: [
      {
        service: {
          type: Schema.Types.ObjectId,
          ref: "Services",
        }
      },
    ], */
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Services",
      },
    ],
    state: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    collection: "Clients",
  }
);

const Clients = model("Clients", ClientSchema);

export default Clients;

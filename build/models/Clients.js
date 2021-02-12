"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var ClientSchema = new _mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true
  },
  lastname: {
    type: String,
    maxlength: 50,
    required: true
  },
  email: {
    type: String,
    maxlength: 50,
    required: true,
    unique: true
  },

  /*     totalSpend: {
    type: Number,
  }, */
  phone: {
    type: Number,
    maxlength: 50
  },
  address: {
    type: String
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
  services: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Services"
  }],
  state: {
    type: Number,
    "default": 1
  },
  isPaid: {
    type: Boolean,
    "default": false
  }
}, {
  timestamps: true,
  collection: "Clients"
});
var Clients = (0, _mongoose.model)("Clients", ClientSchema);
var _default = Clients;
exports["default"] = _default;
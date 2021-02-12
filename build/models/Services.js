"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var ServicesSchema = new _mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true
  },
  price: {
    type: Number
  },
  description: {
    type: String
  },
  serviceType: {
    type: String,
    "enum": ["Mensual", "Anual", "Fijo"],
    required: true,
    "default": 'Mensual'
  },
  state: {
    type: Number,
    "default": 1
  }
}, {
  timestamps: true,
  collection: "Services"
});
var Services = (0, _mongoose.model)("Services", ServicesSchema);
var _default = Services;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var ExpensesSchema = new _mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
    required: true
  },
  price: {
    type: Number
  },
  state: {
    type: Number,
    "default": 1
  }
}, {
  timestamps: true,
  collection: 'Expenses'
});
var Expenses = (0, _mongoose.model)('Expenses', ExpensesSchema);
var _default = Expenses;
exports["default"] = _default;
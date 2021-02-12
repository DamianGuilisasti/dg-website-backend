"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var BudgetSchema = new _mongoose.Schema({
  client: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Clients"
  },
  services: [{
    type: _mongoose.Schema.Types.ObjectId,
    ref: "Services"
  }],
  state: {
    type: Number,
    "default": 1
  }
}, {
  timestamps: true,
  collection: "Budgets"
});
var Budgets = (0, _mongoose.model)("Budgets", BudgetSchema);
var _default = Budgets;
exports["default"] = _default;
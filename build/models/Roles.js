"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var rolSchema = new _mongoose.Schema({
  name: {
    type: String
  }
}, {
  timestamps: true,
  collection: "Roles"
});

var _default = (0, _mongoose.model)("Rol", rolSchema);

exports["default"] = _default;
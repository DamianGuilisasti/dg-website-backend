"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var productSchema = new _mongoose.Schema({
  name: {
    type: String
  },
  category: {
    type: String
  },
  price: {
    type: Number
  },
  imgUrl: {
    type: String
  }
}, {
  timestamps: true,
  collection: 'Productos'
});

var _default = (0, _mongoose.model)('Product', productSchema);

exports["default"] = _default;
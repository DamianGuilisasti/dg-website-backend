"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Posts = _interopRequireDefault(require("./Posts"));

var _Clients = _interopRequireDefault(require("./Clients"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  Posts: _Posts["default"],
  Clients: _Clients["default"]
};
exports["default"] = _default;
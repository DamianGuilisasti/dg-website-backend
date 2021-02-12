"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _verifyToken = _interopRequireDefault(require("./verifyToken"));

var _verifyRole = _interopRequireDefault(require("./verifyRole"));

var _verifyRegister = _interopRequireDefault(require("./verifyRegister"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  verifyToken: _verifyToken["default"],
  verifyRole: _verifyRole["default"],
  verifyRegister: _verifyRegister["default"]
};
exports["default"] = _default;
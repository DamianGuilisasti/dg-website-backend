"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _middlewares = _interopRequireDefault(require("../middlewares"));

var _RolController = _interopRequireDefault(require("../controllers/RolController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/list", _RolController["default"].list);
var _default = router;
exports["default"] = _default;
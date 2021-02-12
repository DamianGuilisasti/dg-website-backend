"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _middlewares = _interopRequireDefault(require("../middlewares"));

var _ServicesController = _interopRequireDefault(require("../controllers/ServicesController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/list", [_middlewares["default"].verifyToken.verify, _middlewares["default"].verifyRole.isAdmin], _ServicesController["default"].list);
router.post("/add", [_middlewares["default"].verifyToken.verify, _middlewares["default"].verifyRole.isAdmin], _ServicesController["default"].add);
router.put("/update", [_middlewares["default"].verifyToken.verify, _middlewares["default"].verifyRole.isAdmin], _ServicesController["default"].updateServiceById);
router.put("/activate", [_middlewares["default"].verifyToken.verify, _middlewares["default"].verifyRole.isAdmin], _ServicesController["default"].activateServiceById);
router.put("/desactivate", [_middlewares["default"].verifyToken.verify, _middlewares["default"].verifyRole.isAdmin], _ServicesController["default"].desactivateServiceById);
router["delete"]("/delete", [_middlewares["default"].verifyToken.verify, _middlewares["default"].verifyRole.isAdmin], _ServicesController["default"].deleteServiceById);
var _default = router;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

var _middlewares = _interopRequireDefault(require("../middlewares"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post("/login", _UserController["default"].login);
router.post("/register", _middlewares["default"].verifyRegister.checkDuplicateUsernameOrEmail, _UserController["default"].register);
router.get("/list", [_middlewares["default"].verifyToken.verify, _middlewares["default"].verifyRole.isAdmin], _UserController["default"].list);
router.post("/add", [_middlewares["default"].verifyToken.verify, _middlewares["default"].verifyRole.isAdmin], _UserController["default"].add);
router.put("/updateInEditAccount", [_middlewares["default"].verifyToken.verify, _middlewares["default"].verifyRole.isAdmin], _UserController["default"].updateInEditAccount);
router.put("/update", [_middlewares["default"].verifyToken.verify, _middlewares["default"].verifyRole.isAdmin], _UserController["default"].update);
router.put("/activate", [_middlewares["default"].verifyToken.verify, _middlewares["default"].verifyRole.isAdmin], _UserController["default"].activate);
router.put("/desactivate", [_middlewares["default"].verifyToken.verify, _middlewares["default"].verifyRole.isAdmin], _UserController["default"].desactivate);
router["delete"]("/remove", [_middlewares["default"].verifyToken.verify, _middlewares["default"].verifyRole.isAdmin], _UserController["default"]["delete"]);
router.get("/query", [_middlewares["default"].verifyToken.verify], _UserController["default"].query);
var _default = router;
exports["default"] = _default;
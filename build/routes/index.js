"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _PostsRouter = _interopRequireDefault(require("./PostsRouter"));

var _ProductRouter = _interopRequireDefault(require("./ProductRouter"));

var _UsersRouter = _interopRequireDefault(require("./UsersRouter"));

var _SettingsRouter = _interopRequireDefault(require("./SettingsRouter"));

var _ClientsRouter = _interopRequireDefault(require("./ClientsRouter"));

var _ServicesRouter = _interopRequireDefault(require("./ServicesRouter"));

var _BudgetsRouter = _interopRequireDefault(require("./BudgetsRouter"));

var _ExpensesRouter = _interopRequireDefault(require("./ExpensesRouter"));

var _RolRouter = _interopRequireDefault(require("./RolRouter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.use("/posts", _PostsRouter["default"]);
router.use("/products", _ProductRouter["default"]);
router.use("/user", _UsersRouter["default"]);
router.use("/settings", _SettingsRouter["default"]);
router.use("/clients", _ClientsRouter["default"]);
router.use("/services", _ServicesRouter["default"]);
router.use("/budgets", _BudgetsRouter["default"]);
router.use("/expenses", _ExpensesRouter["default"]);
router.use("/roles", _RolRouter["default"]);
var _default = router;
exports["default"] = _default;
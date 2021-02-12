"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _ExpensesController = _interopRequireDefault(require("../controllers/ExpensesController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/list", _ExpensesController["default"].list);
router.post("/add", _ExpensesController["default"].add);
router.put("/update", _ExpensesController["default"].updateExpenseById);
router.put("/activate", _ExpensesController["default"].activateExpenseById);
router.put("/desactivate", _ExpensesController["default"].desactivateExpenseById);
router["delete"]("/delete", _ExpensesController["default"].deleteExpenseById);
var _default = router;
exports["default"] = _default;
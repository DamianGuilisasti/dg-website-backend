"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _BudgetsController = _interopRequireDefault(require("../controllers/BudgetsController"));

var _uploadPDF = _interopRequireDefault(require("../middlewares/uploadPDF"));

var _uploadBill = _interopRequireDefault(require("../middlewares/uploadBill"));

var _index = _interopRequireDefault(require("../middlewares/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/list", [_index["default"].verifyToken.verify, _index["default"].verifyRole.isAdmin], _BudgetsController["default"].list);
router.post("/add", [_index["default"].verifyToken.verify, _index["default"].verifyRole.isAdmin], _BudgetsController["default"].add);
router.put("/update", [_index["default"].verifyToken.verify, _index["default"].verifyRole.isAdmin], _BudgetsController["default"].updateBudgetById);
router.put("/activate", [_index["default"].verifyToken.verify, _index["default"].verifyRole.isAdmin], _BudgetsController["default"].activateBudgetById);
router.put("/approved", [_index["default"].verifyToken.verify, _index["default"].verifyRole.isAdmin], _BudgetsController["default"].approvedBudgetById);
router.put("/desactivate", [_index["default"].verifyToken.verify, _index["default"].verifyRole.isAdmin], _BudgetsController["default"].desactivateBudgetById);
router["delete"]("/delete", [_index["default"].verifyToken.verify, _index["default"].verifyRole.isAdmin], _BudgetsController["default"].deleteBudgetById);
router.post("/sendEmail", [_index["default"].verifyToken.verify, _index["default"].verifyRole.isAdmin], _BudgetsController["default"].sendEmail);
router.post("/uploadPDF", _uploadPDF["default"], [_index["default"].verifyToken.verify, _index["default"].verifyRole.isAdmin], _BudgetsController["default"].uploadPDF);
router.post("/uploadBillPDF", _uploadBill["default"], [_index["default"].verifyToken.verify, _index["default"].verifyRole.isAdmin], _BudgetsController["default"].sendEmailManually);
var _default = router;
exports["default"] = _default;
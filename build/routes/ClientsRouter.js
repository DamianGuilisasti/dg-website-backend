"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _ClientsController = _interopRequireDefault(require("../controllers/ClientsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get("/list", _ClientsController["default"].list);
router.post("/add", _ClientsController["default"].add);
router.put("/update", _ClientsController["default"].updateClientById);
router.put("/activate", _ClientsController["default"].activateClientById);
router.put("/desactivate", _ClientsController["default"].desactivateClientById);
router["delete"]("/delete", _ClientsController["default"].deleteClientById);
router.put("/clientIsPaid", _ClientsController["default"].clientPaidById);
router.put("/clientIsNotPaid", _ClientsController["default"].clientNotPaidById);
var _default = router;
exports["default"] = _default;
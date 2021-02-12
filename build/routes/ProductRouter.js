"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _middlewares = _interopRequireDefault(require("../middlewares"));

var _ProductController = _interopRequireDefault(require("../controllers/ProductController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = (0, _express.Router)();
router.post('/add', [_middlewares["default"].verifyToken.verify, _middlewares["default"].verifyRole.isAdmin], _ProductController["default"].createProduct);
router.get('/list', _ProductController["default"].getProducts);
router.get('/get', _ProductController["default"].getProductById);
router.put('/update', [_middlewares["default"].verifyToken.verify, _middlewares["default"].verifyRole.isAdmin], _ProductController["default"].updateProductById);
router["delete"]('/delete', [_middlewares["default"].verifyToken.verify, _middlewares["default"].verifyRole.isAdmin], _ProductController["default"].deleteProductById);
var _default = router;
exports["default"] = _default;
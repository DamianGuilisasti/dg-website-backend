"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _PostsController = _interopRequireDefault(require("../controllers/PostsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.get('/list', _PostsController["default"].list);
router.post('/add', _PostsController["default"].add);
var _default = router;
exports["default"] = _default;
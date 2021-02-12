"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _multer = _interopRequireDefault(require("multer"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var storage = _multer["default"].diskStorage({
  destination: _path["default"].join(__dirname, "../public/img/uploads"),
  filename: function filename(req, file, cb) {
    cb(null, new Date().getTime() + _path["default"].extname(file.originalname));
  }
});

var upload = (0, _multer["default"])({
  storage: storage,
  limits: {
    fieldSize: 30 * 2048 * 2048
  }
}).single("image");
var _default = upload;
exports["default"] = _default;
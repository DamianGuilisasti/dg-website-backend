"use strict";

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _process$env = process.env,
    MONGODB_HOST = _process$env.MONGODB_HOST,
    MONGODB_DATABASE = _process$env.MONGODB_DATABASE;
var MONGODB_URI = "mongodb://".concat(MONGODB_HOST, "/").concat(MONGODB_DATABASE);

_mongoose["default"].connect(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true
}).then(function (db) {
  return console.log("Database is connected");
})["catch"](function (err) {
  return console.log(err);
});
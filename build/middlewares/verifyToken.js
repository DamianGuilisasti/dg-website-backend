"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  verify: function () {
    var _verify = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var token, tokenDecoded, user;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              token = req.headers.token;

              if (token) {
                _context.next = 4;
                break;
              }

              return _context.abrupt("return", res.status(403).send({
                message: "No token"
              }));

            case 4:
              tokenDecoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
              user = _User["default"].findById(tokenDecoded.id);

              if (user) {
                _context.next = 8;
                break;
              }

              return _context.abrupt("return", res.status(404).json({
                message: "No user found"
              }));

            case 8:
              next();
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              return _context.abrupt("return", res.status(401).json({
                message: "No autorizado"
              }));

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 11]]);
    }));

    function verify(_x, _x2, _x3) {
      return _verify.apply(this, arguments);
    }

    return verify;
  }()
};
exports["default"] = _default;
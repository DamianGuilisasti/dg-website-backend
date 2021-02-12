"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _User = _interopRequireDefault(require("../models/User"));

var _Roles = _interopRequireDefault(require("../models/Roles"));

var _config = _interopRequireDefault(require("../config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  isAdmin: function () {
    var _isAdmin = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var token, tokenDecoded, user, roles, i;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              token = req.headers.token;
              tokenDecoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
              _context.next = 4;
              return _User["default"].findById(tokenDecoded.id).populate("rol");

            case 4:
              user = _context.sent;
              _context.next = 7;
              return _Roles["default"].find({
                _id: {
                  $in: user.rol
                }
              });

            case 7:
              roles = _context.sent;
              i = 0;

            case 9:
              if (!(i < roles.length)) {
                _context.next = 16;
                break;
              }

              if (!(roles[i].name === "Admin")) {
                _context.next = 13;
                break;
              }

              next();
              return _context.abrupt("return");

            case 13:
              i++;
              _context.next = 9;
              break;

            case 16:
              return _context.abrupt("return", res.status(403).json({
                message: "Requiere Admin"
              }));

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function isAdmin(_x, _x2, _x3) {
      return _isAdmin.apply(this, arguments);
    }

    return isAdmin;
  }(),
  isClient: function () {
    var _isClient = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
      var token, tokenDecoded, user, roles, i;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              token = req.headers.token;
              tokenDecoded = _jsonwebtoken["default"].verify(token, _config["default"].SECRET);
              _context2.next = 4;
              return _User["default"].findById(tokenDecoded.id).populate("rol");

            case 4:
              user = _context2.sent;
              _context2.next = 7;
              return _Roles["default"].find({
                _id: {
                  $in: user.rol
                }
              });

            case 7:
              roles = _context2.sent;
              i = 0;

            case 9:
              if (!(i < roles.length)) {
                _context2.next = 16;
                break;
              }

              if (!(roles[i].name === "Cliente")) {
                _context2.next = 13;
                break;
              }

              next();
              return _context2.abrupt("return");

            case 13:
              i++;
              _context2.next = 9;
              break;

            case 16:
              return _context2.abrupt("return", res.status(403).json({
                message: "Requiere Cliente"
              }));

            case 17:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function isClient(_x4, _x5, _x6) {
      return _isClient.apply(this, arguments);
    }

    return isClient;
  }()
};
exports["default"] = _default;
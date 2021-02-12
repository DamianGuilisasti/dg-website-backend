"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Expenses = _interopRequireDefault(require("../models/Expenses"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  list: function () {
    var _list = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var result;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _Expenses["default"].find();

            case 3:
              result = _context.sent;
              res.status(200).json(result);
              _context.next = 11;
              break;

            case 7:
              _context.prev = 7;
              _context.t0 = _context["catch"](0);
              res.status(500).send({
                message: "Ocurrió un error"
              });
              next(_context.t0);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 7]]);
    }));

    function list(_x, _x2, _x3) {
      return _list.apply(this, arguments);
    }

    return list;
  }(),
  add: function () {
    var _add = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
      var _req$body, name, price, newExpense, expenseSaved;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body = req.body, name = _req$body.name, price = _req$body.price;
              newExpense = new _Expenses["default"]({
                name: name,
                price: price
              });
              _context2.next = 5;
              return newExpense.save();

            case 5:
              expenseSaved = _context2.sent;
              res.status(200).json(expenseSaved); //const reg = await models.Post.create(req.body);
              //res.status(200).json(reg);

              _context2.next = 14;
              break;

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);
              res.status(500).send({
                message: "Ocurrió un error"
              });
              next(_context2.t0);

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 9]]);
    }));

    function add(_x4, _x5, _x6) {
      return _add.apply(this, arguments);
    }

    return add;
  }(),
  updateExpenseById: function () {
    var _updateExpenseById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
      var expenseUpdated;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _Expenses["default"].findByIdAndUpdate({
                _id: req.body._id
              }, req.body, {
                "new": true
              });

            case 3:
              expenseUpdated = _context3.sent;
              res.status(200).json(expenseUpdated);
              _context3.next = 11;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              res.status(500).send({
                message: "Ocurrió un error."
              });
              next(_context3.t0);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 7]]);
    }));

    function updateExpenseById(_x7, _x8, _x9) {
      return _updateExpenseById.apply(this, arguments);
    }

    return updateExpenseById;
  }(),
  deleteExpenseById: function () {
    var _deleteExpenseById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
      var reg;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _Expenses["default"].findByIdAndDelete({
                _id: req.query.id
              });

            case 3:
              reg = _context4.sent;
              res.status(200).json(reg);
              _context4.next = 11;
              break;

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              res.status(500).send({
                message: "Ocurrió un error."
              });
              next(_context4.t0);

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 7]]);
    }));

    function deleteExpenseById(_x10, _x11, _x12) {
      return _deleteExpenseById.apply(this, arguments);
    }

    return deleteExpenseById;
  }(),
  activateExpenseById: function () {
    var _activateExpenseById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
      var expenseUpdated;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _Expenses["default"].findByIdAndUpdate({
                _id: req.body._id
              }, {
                state: 1
              }, {
                "new": true
              });

            case 3:
              expenseUpdated = _context5.sent;
              res.status(200).json(expenseUpdated);
              _context5.next = 11;
              break;

            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);
              res.status(500).send({
                message: "Ocurrió un error."
              });
              next(_context5.t0);

            case 11:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 7]]);
    }));

    function activateExpenseById(_x13, _x14, _x15) {
      return _activateExpenseById.apply(this, arguments);
    }

    return activateExpenseById;
  }(),
  desactivateExpenseById: function () {
    var _desactivateExpenseById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
      var expenseUpdated;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _Expenses["default"].findByIdAndUpdate({
                _id: req.body._id
              }, {
                state: 0
              }, {
                "new": true
              });

            case 3:
              expenseUpdated = _context6.sent;
              res.status(200).json(expenseUpdated);
              _context6.next = 11;
              break;

            case 7:
              _context6.prev = 7;
              _context6.t0 = _context6["catch"](0);
              res.status(500).send({
                message: "Ocurrió un error."
              });
              next(_context6.t0);

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 7]]);
    }));

    function desactivateExpenseById(_x16, _x17, _x18) {
      return _desactivateExpenseById.apply(this, arguments);
    }

    return desactivateExpenseById;
  }()
};
exports["default"] = _default;
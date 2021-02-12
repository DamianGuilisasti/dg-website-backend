"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Budgets = _interopRequireDefault(require("../models/Budgets"));

var _mailer = _interopRequireDefault(require("../config/mailer"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

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
              return _Budgets["default"].find().populate("client services", {
                lastname: 1,
                email: 1,
                name: 1,
                serviceType: 1,
                address: 1,
                phone: 1,
                price: 1,
                description: 1,
                _id: 0
              });

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
      var _req$body, client, services, newBudget, BudgetSaved;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body = req.body, client = _req$body.client, services = _req$body.services;
              newBudget = new _Budgets["default"]({
                client: client,
                services: services
              });
              _context2.next = 5;
              return newBudget.save();

            case 5:
              BudgetSaved = _context2.sent;
              res.status(200).json(BudgetSaved); //const reg = await models.Post.create(req.body);
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
  updateBudgetById: function () {
    var _updateBudgetById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
      var BudgetUpdated;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _Budgets["default"].findByIdAndUpdate({
                _id: req.body._id
              }, req.body, {
                "new": true
              });

            case 3:
              BudgetUpdated = _context3.sent;
              res.status(200).json(BudgetUpdated);
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

    function updateBudgetById(_x7, _x8, _x9) {
      return _updateBudgetById.apply(this, arguments);
    }

    return updateBudgetById;
  }(),
  deleteBudgetById: function () {
    var _deleteBudgetById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
      var reg;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _Budgets["default"].findByIdAndDelete({
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

    function deleteBudgetById(_x10, _x11, _x12) {
      return _deleteBudgetById.apply(this, arguments);
    }

    return deleteBudgetById;
  }(),
  activateBudgetById: function () {
    var _activateBudgetById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
      var BudgetUpdated;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _Budgets["default"].findByIdAndUpdate({
                _id: req.body._id
              }, {
                state: 1
              }, {
                "new": true
              });

            case 3:
              BudgetUpdated = _context5.sent;
              res.status(200).json(BudgetUpdated);
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

    function activateBudgetById(_x13, _x14, _x15) {
      return _activateBudgetById.apply(this, arguments);
    }

    return activateBudgetById;
  }(),
  approvedBudgetById: function () {
    var _approvedBudgetById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
      var BudgetUpdated;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _Budgets["default"].findByIdAndUpdate({
                _id: req.body._id
              }, {
                state: 2
              }, {
                "new": true
              });

            case 3:
              BudgetUpdated = _context6.sent;
              res.status(200).json(BudgetUpdated);
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

    function approvedBudgetById(_x16, _x17, _x18) {
      return _approvedBudgetById.apply(this, arguments);
    }

    return approvedBudgetById;
  }(),
  desactivateBudgetById: function () {
    var _desactivateBudgetById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res, next) {
      var BudgetUpdated;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _Budgets["default"].findByIdAndUpdate({
                _id: req.body._id
              }, {
                state: 0
              }, {
                "new": true
              });

            case 3:
              BudgetUpdated = _context7.sent;
              res.status(200).json(BudgetUpdated);
              _context7.next = 11;
              break;

            case 7:
              _context7.prev = 7;
              _context7.t0 = _context7["catch"](0);
              res.status(500).send({
                message: "Ocurrió un error."
              });
              next(_context7.t0);

            case 11:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 7]]);
    }));

    function desactivateBudgetById(_x19, _x20, _x21) {
      return _desactivateBudgetById.apply(this, arguments);
    }

    return desactivateBudgetById;
  }(),
  sendEmail: function () {
    var _sendEmail = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res, next) {
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return _mailer["default"].welcomeMail(req.body.email, req.body.name);

            case 3:
              res.status(200).send({
                message: "Email enviado"
              });
              _context8.next = 10;
              break;

            case 6:
              _context8.prev = 6;
              _context8.t0 = _context8["catch"](0);
              res.status(500).send({
                message: "Ocurrió un error."
              });
              next(_context8.t0);

            case 10:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 6]]);
    }));

    function sendEmail(_x22, _x23, _x24) {
      return _sendEmail.apply(this, arguments);
    }

    return sendEmail;
  }(),
  sendEmailManually: function () {
    var _sendEmailManually = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res, next) {
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              console.log(req.body);
              _context9.next = 4;
              return _mailer["default"].sendBillManually(req.body.email, req.body.name, req.body.subject);

            case 4:
              _context9.next = 6;
              return _fsExtra["default"].unlink(req.file.path);

            case 6:
              res.status(200).send({
                message: "Email enviado"
              });
              _context9.next = 13;
              break;

            case 9:
              _context9.prev = 9;
              _context9.t0 = _context9["catch"](0);
              res.status(500).send({
                message: "Ocurrió un error."
              });
              next(_context9.t0);

            case 13:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 9]]);
    }));

    function sendEmailManually(_x25, _x26, _x27) {
      return _sendEmailManually.apply(this, arguments);
    }

    return sendEmailManually;
  }(),
  uploadPDF: function () {
    var _uploadPDF = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res, next) {
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              _context10.next = 3;
              return _mailer["default"].welcomeMail(req.body.email, req.body.name);

            case 3:
              _context10.next = 5;
              return _fsExtra["default"].unlink(req.file.path);

            case 5:
              res.status(200).send({
                message: "Email enviado"
              });
              _context10.next = 13;
              break;

            case 8:
              _context10.prev = 8;
              _context10.t0 = _context10["catch"](0);
              res.status(500).send({
                message: "Ocurrió un error."
              });
              console.log(_context10.t0);
              next(_context10.t0);

            case 13:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[0, 8]]);
    }));

    function uploadPDF(_x28, _x29, _x30) {
      return _uploadPDF.apply(this, arguments);
    }

    return uploadPDF;
  }()
};
exports["default"] = _default;
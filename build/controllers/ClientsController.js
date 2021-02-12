"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Clients = _interopRequireDefault(require("../models/Clients"));

var _models = _interopRequireDefault(require("../models"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  /*     list: async (req, res, next) => {
        try {
            const result = await Client.find()
            .populate('Services', {name: 1});
            res.status(200).json(result);
        }
        catch (e) {
            res.status(500).send({
                message: 'Ocurrió un error'
            });
            next(e);
        }
    }, */

  /*   list: async (req, res, next) => {
    try {
      let value = req.query.value;
      const reg = await models.Clients.find().populate("services.service", {
        name: 1,
        _id: 0,
        price: 1,
      }); //tiene que ir en minúsuclas, no preguntes porque.. jeje
      //.populate('services').populate('service', { name: 1, _id: 0, price: 1 });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  }, */
  list: function () {
    var _list = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var reg;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _models["default"].Clients.find().populate("services", {
                name: 1,
                _id: 1,
                price: 1,
                description: 1
              });

            case 3:
              reg = _context.sent;
              //tiene que ir en minúsuclas, no preguntes porque.. jeje
              //.populate('services').populate('service', { name: 1, _id: 0, price: 1 });
              res.status(200).json(reg);
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
      var _req$body, name, lastname, email, phone, services, address, newClient, clientSaved;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body = req.body, name = _req$body.name, lastname = _req$body.lastname, email = _req$body.email, phone = _req$body.phone, services = _req$body.services, address = _req$body.address;
              newClient = new _Clients["default"]({
                name: name,
                lastname: lastname,
                email: email,
                phone: phone,
                services: services,
                address: address
              });
              _context2.next = 5;
              return newClient.save();

            case 5:
              clientSaved = _context2.sent;
              res.status(200).json(clientSaved); //const reg = await models.Post.create(req.body);
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
              next();

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
  updateClientById: function () {
    var _updateClientById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
      var clientUpdated;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _Clients["default"].findByIdAndUpdate({
                _id: req.body._id
              }, req.body, {
                "new": true
              });

            case 3:
              clientUpdated = _context3.sent;
              //el new es para que me devuelva los datos actualizados, no el registro viejo.
              res.status(200).json(clientUpdated);
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

    function updateClientById(_x7, _x8, _x9) {
      return _updateClientById.apply(this, arguments);
    }

    return updateClientById;
  }(),
  activateClientById: function () {
    var _activateClientById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
      var clientUpdated;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _Clients["default"].findByIdAndUpdate({
                _id: req.body._id
              }, {
                state: 1
              }, {
                "new": true
              });

            case 3:
              clientUpdated = _context4.sent;
              res.status(200).json(clientUpdated);
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

    function activateClientById(_x10, _x11, _x12) {
      return _activateClientById.apply(this, arguments);
    }

    return activateClientById;
  }(),
  desactivateClientById: function () {
    var _desactivateClientById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
      var clientUpdated;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _Clients["default"].findByIdAndUpdate({
                _id: req.body._id
              }, {
                state: 0
              }, {
                "new": true
              });

            case 3:
              clientUpdated = _context5.sent;
              res.status(200).json(clientUpdated);
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

    function desactivateClientById(_x13, _x14, _x15) {
      return _desactivateClientById.apply(this, arguments);
    }

    return desactivateClientById;
  }(),
  clientPaidById: function () {
    var _clientPaidById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
      var clientUpdated;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _Clients["default"].findByIdAndUpdate({
                _id: req.body._id
              }, {
                isPaid: true
              }, {
                "new": true
              });

            case 3:
              clientUpdated = _context6.sent;
              res.status(200).json(clientUpdated);
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

    function clientPaidById(_x16, _x17, _x18) {
      return _clientPaidById.apply(this, arguments);
    }

    return clientPaidById;
  }(),
  clientNotPaidById: function () {
    var _clientNotPaidById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res, next) {
      var clientUpdated;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _Clients["default"].findByIdAndUpdate({
                _id: req.body._id
              }, {
                isPaid: false
              }, {
                "new": true
              });

            case 3:
              clientUpdated = _context7.sent;
              res.status(200).json(clientUpdated);
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

    function clientNotPaidById(_x19, _x20, _x21) {
      return _clientNotPaidById.apply(this, arguments);
    }

    return clientNotPaidById;
  }(),
  deleteClientById: function () {
    var _deleteClientById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res, next) {
      var reg;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return _Clients["default"].findByIdAndDelete({
                _id: req.query.id
              });

            case 3:
              reg = _context8.sent;
              res.status(200).json(reg);
              _context8.next = 11;
              break;

            case 7:
              _context8.prev = 7;
              _context8.t0 = _context8["catch"](0);
              res.status(500).send({
                message: "Ocurrió un error."
              });
              next(_context8.t0);

            case 11:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, null, [[0, 7]]);
    }));

    function deleteClientById(_x22, _x23, _x24) {
      return _deleteClientById.apply(this, arguments);
    }

    return deleteClientById;
  }()
};
exports["default"] = _default;
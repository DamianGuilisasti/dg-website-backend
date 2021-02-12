"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../config"));

var _Roles = _interopRequireDefault(require("../models/Roles"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  login: function () {
    var _login = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var _req$body, email, password, userFound, matchPassword, token;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _req$body = req.body, email = _req$body.email, password = _req$body.password;
              _context.next = 3;
              return _User["default"].findOne({
                email: email
              }).populate("rol");

            case 3:
              userFound = _context.sent;

              if (userFound) {
                _context.next = 6;
                break;
              }

              return _context.abrupt("return", res.status(404).send({
                message: "No se encontró al usuario"
              }));

            case 6:
              _context.next = 8;
              return _User["default"].comparePassword(password, userFound.password);

            case 8:
              matchPassword = _context.sent;

              if (matchPassword) {
                _context.next = 11;
                break;
              }

              return _context.abrupt("return", res.status(401).json({
                token: null,
                message: "Contraseña incorrecta"
              }));

            case 11:
              token = _jsonwebtoken["default"].sign({
                id: userFound._id,
                rol: userFound.rol
              }, _config["default"].SECRET, {
                expiresIn: 86400
              });
              res.status(200).json({
                token: token
              });

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function login(_x, _x2, _x3) {
      return _login.apply(this, arguments);
    }

    return login;
  }(),
  register: function () {
    var _register = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
      var _req$body2, username, email, password, rol, newUser, foundRoles, role, newUserSaved, token;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _req$body2 = req.body, username = _req$body2.username, email = _req$body2.email, password = _req$body2.password, rol = _req$body2.rol;
              _context2.t0 = _User["default"];
              _context2.t1 = username;
              _context2.t2 = email;
              _context2.next = 7;
              return _User["default"].encryptPassword(password);

            case 7:
              _context2.t3 = _context2.sent;
              _context2.t4 = {
                username: _context2.t1,
                email: _context2.t2,
                password: _context2.t3
              };
              newUser = new _context2.t0(_context2.t4);

              if (!rol) {
                _context2.next = 17;
                break;
              }

              _context2.next = 13;
              return _Roles["default"].find({
                name: {
                  $in: rol
                }
              });

            case 13:
              foundRoles = _context2.sent;
              newUser.rol = foundRoles.map(function (rol) {
                return rol._id;
              });
              _context2.next = 21;
              break;

            case 17:
              _context2.next = 19;
              return _Roles["default"].findOne({
                name: "Cliente"
              });

            case 19:
              role = _context2.sent;
              newUser.rol = [role._id];

            case 21:
              _context2.next = 23;
              return newUser.save();

            case 23:
              newUserSaved = _context2.sent;
              token = _jsonwebtoken["default"].sign({
                id: newUserSaved._id
              }, _config["default"].SECRET, {
                expiresIn: 86400
              });
              res.status(200).json(token);
              _context2.next = 32;
              break;

            case 28:
              _context2.prev = 28;
              _context2.t5 = _context2["catch"](0);
              console.log(_context2.t5);
              next(_context2.t5);

            case 32:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 28]]);
    }));

    function register(_x4, _x5, _x6) {
      return _register.apply(this, arguments);
    }

    return register;
  }(),
  list: function () {
    var _list = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
      var reg;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _User["default"].find().populate("rol", {
                name: 1,
                _id: 1
              });

            case 3:
              reg = _context3.sent;
              res.status(200).json(reg);
              _context3.next = 11;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              res.status(500).send({
                message: "Ocurrió un error"
              });
              next(_context3.t0);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 7]]);
    }));

    function list(_x7, _x8, _x9) {
      return _list.apply(this, arguments);
    }

    return list;
  }(),
  add: function () {
    var _add = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
      var _req$body3, name, lastname, email, username, password, rol, state, newUser, userSaved;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _req$body3 = req.body, name = _req$body3.name, lastname = _req$body3.lastname, email = _req$body3.email, username = _req$body3.username, password = _req$body3.password, rol = _req$body3.rol, state = _req$body3.state;
              _context4.t0 = _User["default"];
              _context4.t1 = name;
              _context4.t2 = lastname;
              _context4.t3 = email;
              _context4.t4 = rol;
              _context4.t5 = username;
              _context4.t6 = state;
              _context4.next = 11;
              return _User["default"].encryptPassword(password);

            case 11:
              _context4.t7 = _context4.sent;
              _context4.t8 = {
                name: _context4.t1,
                lastname: _context4.t2,
                email: _context4.t3,
                rol: _context4.t4,
                username: _context4.t5,
                state: _context4.t6,
                password: _context4.t7
              };
              newUser = new _context4.t0(_context4.t8);
              _context4.next = 16;
              return newUser.save();

            case 16:
              userSaved = _context4.sent;
              res.status(200).json(userSaved); //const reg = await models.Post.create(req.body);
              //res.status(200).json(reg);

              _context4.next = 25;
              break;

            case 20:
              _context4.prev = 20;
              _context4.t9 = _context4["catch"](0);
              console.log(_context4.t9);
              res.status(500).send({
                message: "Ocurrió un error"
              });
              next();

            case 25:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 20]]);
    }));

    function add(_x10, _x11, _x12) {
      return _add.apply(this, arguments);
    }

    return add;
  }(),
  updateInEditAccount: function () {
    var _updateInEditAccount = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
      var _req$body4, email, password, newpassword, username, name, lastname, rol, userFound, matchPassword, userUpdated;

      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _req$body4 = req.body, email = _req$body4.email, password = _req$body4.password, newpassword = _req$body4.newpassword, username = _req$body4.username, name = _req$body4.name, lastname = _req$body4.lastname, rol = _req$body4.rol;
              _context5.next = 4;
              return _User["default"].findOne({
                email: email
              }).populate("rol");

            case 4:
              userFound = _context5.sent;
              console.log(userFound);
              /*       if (userFound.rol[0].name !== "Admin") {
                return res.status(401).json({ message: "No autorizado" });
              } */

              _context5.next = 8;
              return _User["default"].comparePassword(password, userFound.password);

            case 8:
              matchPassword = _context5.sent;

              if (matchPassword) {
                _context5.next = 11;
                break;
              }

              return _context5.abrupt("return", res.status(401).json({
                message: "Contraseña incorrecta"
              }));

            case 11:
              _context5.t0 = _User["default"];
              _context5.t1 = {
                _id: req.body._id
              };
              _context5.t2 = name;
              _context5.t3 = lastname;
              _context5.t4 = email;
              _context5.t5 = rol;
              _context5.t6 = username;
              _context5.next = 20;
              return _User["default"].encryptPassword(newpassword);

            case 20:
              _context5.t7 = _context5.sent;
              _context5.t8 = {
                name: _context5.t2,
                lastname: _context5.t3,
                email: _context5.t4,
                rol: _context5.t5,
                username: _context5.t6,
                password: _context5.t7
              };
              _context5.t9 = {
                "new": true
              };
              _context5.next = 25;
              return _context5.t0.findByIdAndUpdate.call(_context5.t0, _context5.t1, _context5.t8, _context5.t9);

            case 25:
              userUpdated = _context5.sent;
              res.status(200).json(userUpdated);
              _context5.next = 33;
              break;

            case 29:
              _context5.prev = 29;
              _context5.t10 = _context5["catch"](0);
              res.status(500).send({
                message: "Ocurrió un error."
              });
              next(_context5.t10);

            case 33:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 29]]);
    }));

    function updateInEditAccount(_x13, _x14, _x15) {
      return _updateInEditAccount.apply(this, arguments);
    }

    return updateInEditAccount;
  }(),
  update: function () {
    var _update = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
      var _req$body5, email, password, username, name, lastname, rol, userUpdated;

      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _req$body5 = req.body, email = _req$body5.email, password = _req$body5.password, username = _req$body5.username, name = _req$body5.name, lastname = _req$body5.lastname, rol = _req$body5.rol;
              _context6.t0 = _User["default"];
              _context6.t1 = {
                _id: req.body._id
              };
              _context6.t2 = name;
              _context6.t3 = lastname;
              _context6.t4 = email;
              _context6.t5 = rol;
              _context6.t6 = username;
              _context6.next = 11;
              return _User["default"].encryptPassword(password);

            case 11:
              _context6.t7 = _context6.sent;
              _context6.t8 = {
                name: _context6.t2,
                lastname: _context6.t3,
                email: _context6.t4,
                rol: _context6.t5,
                username: _context6.t6,
                password: _context6.t7
              };
              _context6.t9 = {
                "new": true
              };
              _context6.next = 16;
              return _context6.t0.findByIdAndUpdate.call(_context6.t0, _context6.t1, _context6.t8, _context6.t9);

            case 16:
              userUpdated = _context6.sent;
              res.status(200).json(userUpdated);
              _context6.next = 24;
              break;

            case 20:
              _context6.prev = 20;
              _context6.t10 = _context6["catch"](0);
              res.status(500).send({
                message: "Ocurrió un error."
              });
              next(_context6.t10);

            case 24:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 20]]);
    }));

    function update(_x16, _x17, _x18) {
      return _update.apply(this, arguments);
    }

    return update;
  }(),
  activate: function () {
    var _activate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res, next) {
      var userUpdated;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _User["default"].findByIdAndUpdate({
                _id: req.body._id
              }, {
                state: 1
              }, {
                "new": true
              });

            case 3:
              userUpdated = _context7.sent;
              res.status(200).json(userUpdated);
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

    function activate(_x19, _x20, _x21) {
      return _activate.apply(this, arguments);
    }

    return activate;
  }(),
  desactivate: function () {
    var _desactivate = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(req, res, next) {
      var userUpdated;
      return regeneratorRuntime.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.prev = 0;
              _context8.next = 3;
              return _User["default"].findByIdAndUpdate({
                _id: req.body._id
              }, {
                state: 0
              }, {
                "new": true
              });

            case 3:
              userUpdated = _context8.sent;
              res.status(200).json(userUpdated);
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

    function desactivate(_x22, _x23, _x24) {
      return _desactivate.apply(this, arguments);
    }

    return desactivate;
  }(),
  "delete": function () {
    var _delete2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(req, res, next) {
      var reg;
      return regeneratorRuntime.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return _User["default"].findByIdAndDelete({
                _id: req.query.id
              });

            case 3:
              reg = _context9.sent;
              res.status(200).json(reg);
              _context9.next = 11;
              break;

            case 7:
              _context9.prev = 7;
              _context9.t0 = _context9["catch"](0);
              res.status(500).send({
                message: "Ocurrió un error."
              });
              next(_context9.t0);

            case 11:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, null, [[0, 7]]);
    }));

    function _delete(_x25, _x26, _x27) {
      return _delete2.apply(this, arguments);
    }

    return _delete;
  }(),
  query: function () {
    var _query = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(req, res, next) {
      var userId, userFound;
      return regeneratorRuntime.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.prev = 0;
              userId = req.query;
              _context10.next = 4;
              return _User["default"].findOne({
                _id: userId
              }).populate("rol");

            case 4:
              userFound = _context10.sent;
              res.status(200).json(userFound);
              _context10.next = 12;
              break;

            case 8:
              _context10.prev = 8;
              _context10.t0 = _context10["catch"](0);
              res.status(500).send({
                message: "Ocurrió un error."
              });
              next(_context10.t0);

            case 12:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, null, [[0, 8]]);
    }));

    function query(_x28, _x29, _x30) {
      return _query.apply(this, arguments);
    }

    return query;
  }()
};
exports["default"] = _default;
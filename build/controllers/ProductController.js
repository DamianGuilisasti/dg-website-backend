"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Product = _interopRequireDefault(require("../models/Product"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var _default = {
  createProduct: function () {
    var _createProduct = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var _req$body, name, category, price, imgUrl, newProduct, newProductSaved;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, name = _req$body.name, category = _req$body.category, price = _req$body.price, imgUrl = _req$body.imgUrl;
              newProduct = new _Product["default"]({
                name: name,
                category: category,
                price: price,
                imgUrl: imgUrl
              });
              _context.next = 5;
              return newProduct.save();

            case 5:
              newProductSaved = _context.sent;
              res.status(200).json(newProductSaved);
              _context.next = 13;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              res.status(500).send({
                message: 'Ocurrió un error'
              });
              next(_context.t0);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 9]]);
    }));

    function createProduct(_x, _x2, _x3) {
      return _createProduct.apply(this, arguments);
    }

    return createProduct;
  }(),
  getProducts: function () {
    var _getProducts = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
      var products;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _Product["default"].find();

            case 3:
              products = _context2.sent;
              res.status(200).json(products);
              _context2.next = 11;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              res.status(500).send({
                message: 'Ocurrió un error'
              });
              next(_context2.t0);

            case 11:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    }));

    function getProducts(_x4, _x5, _x6) {
      return _getProducts.apply(this, arguments);
    }

    return getProducts;
  }(),
  getProductById: function () {
    var _getProductById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
      var product;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _Product["default"].findById(req.body._id);

            case 3:
              product = _context3.sent;
              res.status(200).json(product);
              _context3.next = 11;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              res.status(500).send({
                message: 'Ocurrió un error'
              });
              next(_context3.t0);

            case 11:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 7]]);
    }));

    function getProductById(_x7, _x8, _x9) {
      return _getProductById.apply(this, arguments);
    }

    return getProductById;
  }(),
  updateProductById: function () {
    var _updateProductById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
      var updatedProduct;
      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _Product["default"].findByIdAndUpdate({
                _id: req.body._id
              }, req.body, {
                "new": true
              });

            case 3:
              updatedProduct = _context4.sent;
              //el new es para que me devuelva los datos actualizados, no el registro viejo.
              res.status(200).json(updatedProduct);
              _context4.next = 11;
              break;

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              res.status(500).send({
                message: 'Ocurrió un error'
              });
              next(_context4.t0);

            case 11:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 7]]);
    }));

    function updateProductById(_x10, _x11, _x12) {
      return _updateProductById.apply(this, arguments);
    }

    return updateProductById;
  }(),
  deleteProductById: function () {
    var _deleteProductById = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _Product["default"].findByIdAndDelete(req.body._id);

            case 3:
              res.status(200).json();
              _context5.next = 10;
              break;

            case 6:
              _context5.prev = 6;
              _context5.t0 = _context5["catch"](0);
              res.status(500).send({
                message: 'Ocurrió un error'
              });
              next(_context5.t0);

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 6]]);
    }));

    function deleteProductById(_x13, _x14, _x15) {
      return _deleteProductById.apply(this, arguments);
    }

    return deleteProductById;
  }()
};
exports["default"] = _default;
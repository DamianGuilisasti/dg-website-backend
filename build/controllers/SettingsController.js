"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Settings = _interopRequireDefault(require("../models/Settings"));

var _cloudinary = _interopRequireDefault(require("cloudinary"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

_cloudinary["default"].config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

var _default = {
  addSettings: function () {
    var _addSettings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
      var _req$body, aboutInfo, companyName, socialMedia, contactInfo, logoURL, companyPhone, whatsapp, companyEmail, newConfiguration, newConfigurationSaved;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _req$body = req.body, aboutInfo = _req$body.aboutInfo, companyName = _req$body.companyName, socialMedia = _req$body.socialMedia, contactInfo = _req$body.contactInfo, logoURL = _req$body.logoURL, companyPhone = _req$body.companyPhone, whatsapp = _req$body.whatsapp, companyEmail = _req$body.companyEmail;
              newConfiguration = new _Settings["default"]({
                aboutInfo: aboutInfo,
                companyName: companyName,
                socialMedia: socialMedia,
                contactInfo: contactInfo,
                logoURL: logoURL,
                companyPhone: companyPhone,
                whatsapp: whatsapp,
                companyEmail: companyEmail
              });
              _context.next = 5;
              return newConfiguration.save();

            case 5:
              newConfigurationSaved = _context.sent;
              res.status(200).json(newConfigurationSaved);
              _context.next = 14;
              break;

            case 9:
              _context.prev = 9;
              _context.t0 = _context["catch"](0);
              console.log(_context.t0);
              res.status(500).json({
                message: "Ocurrió un error"
              });
              next();

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 9]]);
    }));

    function addSettings(_x, _x2, _x3) {
      return _addSettings.apply(this, arguments);
    }

    return addSettings;
  }(),
  listSettings: function () {
    var _listSettings = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
      var settings;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _Settings["default"].find();

            case 3:
              settings = _context2.sent;
              res.status(200).json(settings);
              _context2.next = 12;
              break;

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](0);
              console.log(_context2.t0);
              res.status(500).json({
                message: "Ocurrió un error"
              });
              next();

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 7]]);
    }));

    function listSettings(_x4, _x5, _x6) {
      return _listSettings.apply(this, arguments);
    }

    return listSettings;
  }(),
  updateInfo: function () {
    var _updateInfo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
      var reg;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _Settings["default"].findByIdAndUpdate({
                _id: req.body._id
              }, {
                aboutInfo: req.body.aboutInfo,
                companyName: req.body.companyName,
                companyPhone: req.body.companyPhone,
                companyEmail: req.body.companyEmail
              });

            case 3:
              reg = _context3.sent;
              res.status(200).json(reg);
              _context3.next = 12;
              break;

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              console.log(_context3.t0);
              res.status(500).json({
                message: "Ocurrió un error"
              });
              next();

            case 12:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 7]]);
    }));

    function updateInfo(_x7, _x8, _x9) {
      return _updateInfo.apply(this, arguments);
    }

    return updateInfo;
  }(),
  updateSocialMedia: function () {
    var _updateSocialMedia = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res, next) {
      var _socialMedia, reg;

      return regeneratorRuntime.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _Settings["default"].findByIdAndUpdate({
                _id: req.body._id
              }, {
                socialMedia: (_socialMedia = {
                  facebook: req.body.facebook,
                  instagram: req.body.instagram,
                  twitter: req.body.twitter,
                  google: req.body.google,
                  youtube: req.body.youtube
                }, _defineProperty(_socialMedia, "google", req.body.google), _defineProperty(_socialMedia, "linkedin", req.body.linkedin), _socialMedia)
              });

            case 3:
              reg = _context4.sent;
              res.status(200).json(reg);
              _context4.next = 12;
              break;

            case 7:
              _context4.prev = 7;
              _context4.t0 = _context4["catch"](0);
              console.log(_context4.t0);
              res.status(500).json({
                message: "Ocurrió un error"
              });
              next();

            case 12:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 7]]);
    }));

    function updateSocialMedia(_x10, _x11, _x12) {
      return _updateSocialMedia.apply(this, arguments);
    }

    return updateSocialMedia;
  }(),
  updateWhatsapp: function () {
    var _updateWhatsapp = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res, next) {
      var reg;
      return regeneratorRuntime.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _Settings["default"].findByIdAndUpdate({
                _id: req.body._id
              }, {
                whatsapp: {
                  phone: req.body.phone,
                  text: req.body.text
                }
              });

            case 3:
              reg = _context5.sent;
              res.status(200).json(reg);
              _context5.next = 12;
              break;

            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);
              console.log(_context5.t0);
              res.status(500).json({
                message: "Ocurrió un error"
              });
              next();

            case 12:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 7]]);
    }));

    function updateWhatsapp(_x13, _x14, _x15) {
      return _updateWhatsapp.apply(this, arguments);
    }

    return updateWhatsapp;
  }(),
  updateLogo: function () {
    var _updateLogo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res, next) {
      var result, reg;
      return regeneratorRuntime.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return _cloudinary["default"].uploader.upload(req.file.path);

            case 3:
              result = _context6.sent;
              _context6.next = 6;
              return _Settings["default"].findByIdAndUpdate({
                _id: req.body._id
              }, {
                logoURL: {
                  public_id: result.public_id,
                  imageURL: result.url
                }
              });

            case 6:
              reg = _context6.sent;
              _context6.next = 9;
              return _fsExtra["default"].unlink(req.file.path);

            case 9:
              res.status(200).json(reg);
              _context6.next = 17;
              break;

            case 12:
              _context6.prev = 12;
              _context6.t0 = _context6["catch"](0);
              console.log(_context6.t0);
              res.status(500).json({
                message: "Ocurrió un error"
              });
              next();

            case 17:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 12]]);
    }));

    function updateLogo(_x16, _x17, _x18) {
      return _updateLogo.apply(this, arguments);
    }

    return updateLogo;
  }(),
  deleteLogo: function () {
    var _deleteLogo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res, next) {
      var reg;
      return regeneratorRuntime.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _Settings["default"].findByIdAndUpdate({
                _id: req.body._id
              }, {
                logoURL: {
                  public_id: "",
                  imageURL: ""
                }
              });

            case 3:
              reg = _context7.sent;
              res.status(200).json(reg);
              _context7.next = 12;
              break;

            case 7:
              _context7.prev = 7;
              _context7.t0 = _context7["catch"](0);
              console.log(_context7.t0);
              res.status(500).json({
                message: "Ocurrió un error"
              });
              next();

            case 12:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, null, [[0, 7]]);
    }));

    function deleteLogo(_x19, _x20, _x21) {
      return _deleteLogo.apply(this, arguments);
    }

    return deleteLogo;
  }()
};
exports["default"] = _default;
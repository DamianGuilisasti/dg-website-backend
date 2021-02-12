"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _SettingsController = _interopRequireDefault(require("../controllers/SettingsController"));

var _upload = _interopRequireDefault(require("../middlewares/upload"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router();

router.post('/add', _SettingsController["default"].addSettings);
router.get('/list', _SettingsController["default"].listSettings);
router.put('/updateInfo', _SettingsController["default"].updateInfo);
router.put('/updateSocialMedia', _SettingsController["default"].updateSocialMedia);
router.put('/updateWhatsapp', _SettingsController["default"].updateWhatsapp);
router.put('/updateLogo', _upload["default"], _SettingsController["default"].updateLogo);
router.put('/deleteLogo', _SettingsController["default"].deleteLogo);
var _default = router;
exports["default"] = _default;
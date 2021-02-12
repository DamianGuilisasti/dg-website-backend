"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./routes"));

var _initialSetup = require("./libs/initialSetup");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Imports
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
} // Database Connection


require("./database"); // Inicializations


var app = (0, _express["default"])();
(0, _initialSetup.createRoles)(); // Settings

app.set("port", process.env.PORT || 3000); // Middlewares

app.use(_express["default"].json());
app.use((0, _morgan["default"])("dev"));
app.use((0, _cors["default"])());
app.use(_express["default"].urlencoded({
  extended: false
})); // Routes

app.use("/api", _routes["default"]); // Static Files

app.use(_express["default"]["static"](__dirname + "/public")); // Start the Server

app.listen(app.get("port"), function () {
  console.log("Server on port: ", app.get("port"));
  console.log("Environment: ", process.env.NODE_ENV);
});
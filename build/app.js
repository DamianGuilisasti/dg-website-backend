"use strict";

var _express = _interopRequireDefault(require("express"));

var _morgan = _interopRequireDefault(require("morgan"));

var _cors = _interopRequireDefault(require("cors"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// Imports
// Inicializations
var app = (0, _express["default"])(); // Settings

app.set("port", process.env.PORT || 3000); // Middlewares

app.use((0, _morgan["default"])("dev"));
app.use((0, _cors["default"])()); // Routes

app.use("/api", _routes["default"]); // Static Files

app.use(_express["default"]["static"](__dirname + "/public")); // Start the Server

app.listen(app.get("port"), function () {
  console.log("Server on port: ", app.get("port"));
});

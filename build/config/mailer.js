"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.transporter = void 0;

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _nodemailerExpressHandlebars = _interopRequireDefault(require("nodemailer-express-handlebars"));

var _path = _interopRequireDefault(require("path"));

var _moment = _interopRequireDefault(require("moment"));

var _http = _interopRequireDefault(require("http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var logoURL = "";
var whatsappURL = "";
var linkedinURL = "";
var instagramURL = "";
var twitterURL = "";
var url = {
  host: "localhost",
  port: 3000,
  path: "/api/settings/list",
  method: "GET"
};

_http["default"].get(url, function (resp) {
  var data = ""; // A chunk of data has been recieved.

  resp.on("data", function (chunk) {
    data += chunk;
  }); // The whole response has been received. Print out the result.

  resp.on("end", function () {
    var bodyData = JSON.parse(data)[0];
    showData(bodyData);
  });
}).on("error", function (err) {
  console.log("Error: " + err.message);
});

function showData(bodyData) {
  logoURL = bodyData.logoURL.imageURL;
  whatsappURL = bodyData.whatsapp.phone;
  linkedinURL = bodyData.socialMedia.linkedin;
  instagramURL = bodyData.socialMedia.instagram;
  twitterURL = bodyData.socialMedia.twitter;
}

function whatsapp() {
  return "https://wa.me/" + whatsappURL + "?text=Hola Damián, te quería consultar lo siguiente: ";
}

var transporter = _nodemailer["default"].createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: false,
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

exports.transporter = transporter;
transporter.verify().then(function () {
  console.log("Conexión del envío de emails correcta");
});
var handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: "../layouts",
    layoutsDir: "../layouts",
    defaultLayout: ""
  },
  viewPath: _path["default"].join(__dirname, "../templates"),
  extName: ".handlebars"
};
transporter.use("compile", (0, _nodemailerExpressHandlebars["default"])(handlebarOptions));
var _default = {
  welcomeMail: function welcomeMail(email, name) {
    return transporter.sendMail({
      from: '"Damián Guilisasti" <hola@damianguilisasti.com.ar>',
      to: email,
      subject: "Presupuesto",
      template: "budget",
      context: {
        user: name,
        year: (0, _moment["default"])(new Date()).format("YYYY"),
        whatsappURL: whatsapp,
        linkedinURL: linkedinURL,
        instagramURL: instagramURL,
        twitterURL: twitterURL,
        websiteURL: "https://damianguilisasti.com.ar/",
        photoURL: "https://damianguilisasti.com.ar/damian.png",
        logoURL: logoURL
      },
      attachments: [{
        filename: "Presupuesto.PDF",
        path: _path["default"].join(__dirname, "../public/img/uploads/Presupuesto.PDF")
      }]
    });
  },
  sendBillManually: function sendBillManually(email, name, subject) {
    return transporter.sendMail({
      from: '"Damián Guilisasti" <hola@damianguilisasti.com.ar>',
      to: email,
      subject: subject,
      template: "bill",
      context: {
        user: name,
        year: (0, _moment["default"])(new Date()).format("YYYY"),
        month: (0, _moment["default"])(new Date()).format("MM/YYYY"),
        whatsappURL: whatsapp,
        linkedinURL: linkedinURL,
        instagramURL: instagramURL,
        twitterURL: twitterURL,
        websiteURL: "https://damianguilisasti.com.ar/",
        photoURL: "https://damianguilisasti.com.ar/damian.png",
        logoURL: logoURL
      },
      attachments: [{
        filename: "Factura.PDF",
        path: _path["default"].join(__dirname, "../public/img/uploads/Factura.PDF")
      }]
    });
  }
};
exports["default"] = _default;
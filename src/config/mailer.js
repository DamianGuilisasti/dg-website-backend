import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import moment from "moment";
import http from "http";

var logoURL = "";
var whatsappURL = "";
var linkedinURL = "";
var instagramURL = "";
var twitterURL = "";

var url = {
  host: "localhost",
  port: 3000,
  path: "/api/settings/list",
  method: "GET",
};
http
  .get(url, (resp) => {
    let data = "";
    // A chunk of data has been recieved.
    resp.on("data", (chunk) => {
      data += chunk;
    });
    // The whole response has been received. Print out the result.
    resp.on("end", () => {
      let bodyData = JSON.parse(data)[0];
      showData(bodyData);
    });
  })
  .on("error", (err) => {
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
  return (
    "https://wa.me/" +
    whatsappURL +
    "?text=Hola Damián, te quería consultar lo siguiente: "
  );
}

export const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  port: process.env.NODEMAILER_PORT,
  secure: false,
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify().then(() => {
  console.log("Conexión del envío de emails correcta");
});

const handlebarOptions = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: "../layouts",
    layoutsDir: "../layouts",
    defaultLayout: "",
  },
  viewPath: path.join(__dirname, "../templates"),
  extName: ".handlebars",
};

transporter.use("compile", hbs(handlebarOptions));

export default {
  welcomeMail: (email, name) =>
    transporter.sendMail({
      from: '"Damián Guilisasti" <hola@damianguilisasti.com.ar>',
      to: email,
      subject: "Presupuesto",
      template: "budget",
      context: {
        user: name,
        year: moment(new Date()).format("YYYY"),
        whatsappURL: whatsapp,
        linkedinURL: linkedinURL,
        instagramURL: instagramURL,
        twitterURL: twitterURL,
        websiteURL: "https://damianguilisasti.com.ar/",
        photoURL: "https://damianguilisasti.com.ar/damian.png",
        logoURL: logoURL,
      },
      attachments: [
        {
          filename: "Presupuesto.PDF",
          path: path.join(__dirname, "../public/img/uploads/Presupuesto.PDF"),
        },
      ],
    }),

    sendBillManually: (email, name, subject) =>
    transporter.sendMail({
      from: '"Damián Guilisasti" <hola@damianguilisasti.com.ar>',
      to: email,
      subject: subject,
      template: "bill",
      context: {
        user: name,
        year: moment(new Date()).format("YYYY"),
        month: moment(new Date()).format("MM/YYYY"),
        whatsappURL: whatsapp,
        linkedinURL: linkedinURL,
        instagramURL: instagramURL,
        twitterURL: twitterURL,
        websiteURL: "https://damianguilisasti.com.ar/",
        photoURL: "https://damianguilisasti.com.ar/damian.png",
        logoURL: logoURL,
      },
      attachments: [
        {
          filename: "Factura.PDF",
          path: path.join(__dirname, "../public/img/uploads/Factura.PDF"),
        },
      ],
    }),
};

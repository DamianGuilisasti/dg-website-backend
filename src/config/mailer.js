import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import moment from "moment";
import http from "http";

import dotenv from "dotenv";

dotenv.config();

var logoURL = "";
var whatsappURL = "";
var linkedinURL = "";
var instagramURL = "";
var twitterURL = "";

var url = {
  host: "localhost", //localhost
  port: 4000,
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
  if (bodyData) {
    logoURL = bodyData.logoURL.imageURL;
    console.log(logoURL);
    whatsappURL = bodyData.whatsapp.phone;
    linkedinURL = bodyData.socialMedia.linkedin;
    instagramURL = bodyData.socialMedia.instagram;
    twitterURL = bodyData.socialMedia.twitter;
  }
}

function whatsapp() {
  return (
    "https://wa.me/" +
    whatsappURL +
    "?text=Hola Damián, te quería consultar lo siguiente: "
  );
}

export const transporter = nodemailer.createTransport({
  host: "mail.amatistamayorista.com",
  port: 25,
  secure: false,
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

/* export let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    type: "OAuth2",
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
    clientId: process.env.NODEMAILER_CLIENTID,
    clientSecret: process.env.NODEMAILER_CLIENTSECRET,
    refreshToken: process.env.NODEMAILER_REFRESHTOKEN,
    accessToken: process.env.NODEMAILER_ACCESSTOKEN,
  },
}); */

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
        photoURL:
          "https://res.cloudinary.com/degq0ap4m/image/upload/v1617795461/damian-bg.7c19179d_nj73v8.jpg",
        logoURL,
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
        photoURL:
          "https://res.cloudinary.com/degq0ap4m/image/upload/v1617795461/damian-bg.7c19179d_nj73v8.jpg",
        logoURL,
      },
      attachments: [
        {
          filename: "Factura.PDF",
          path: path.join(__dirname, "../public/img/uploads/Factura.PDF"),
        },
      ],
    }),

  forgotPassword: (email, name, subject) =>
    transporter.sendMail({
      from: '"Damián Guilisasti" <hola@damianguilisasti.com.ar>',
      to: email,
      subject: subject,
      template: "resetPassword",
      context: {
        //resetLink: "", este link es para resetear la contraseña del usuario.
        user: name,
        year: moment(new Date()).format("YYYY"),
        month: moment(new Date()).format("MM/YYYY"),
        whatsappURL: whatsapp,
        linkedinURL: linkedinURL,
        instagramURL: instagramURL,
        twitterURL: twitterURL,
        websiteURL: "https://damianguilisasti.com.ar/",
        photoURL:
          "https://res.cloudinary.com/degq0ap4m/image/upload/v1617795461/damian-bg.7c19179d_nj73v8.jpg",
        logoURL,
      },
    }),

  resetPassword: (email, name, subject, resetURL) =>
    transporter.sendMail({
      from: '"Damián Guilisasti" <hola@damianguilisasti.com.ar>',
      to: email,
      subject: subject,
      template: "resetPassword",
      context: {
        resetURL,
        user: name,
        year: moment(new Date()).format("YYYY"),
        month: moment(new Date()).format("MM/YYYY"),
        whatsappURL: whatsapp,
        linkedinURL: linkedinURL,
        instagramURL: instagramURL,
        twitterURL: twitterURL,
        websiteURL: "https://damianguilisasti.com.ar/",
        photoURL:
          "https://res.cloudinary.com/degq0ap4m/image/upload/v1617795461/damian-bg.7c19179d_nj73v8.jpg",
        logoURL,
      },
    }),
};

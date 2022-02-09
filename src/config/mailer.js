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
var facebookURL = "";
var googleURL = "";
var youtubeURL = "";
var companyImg = "";
var companyName = "";
var companyURL = "";
var websiteURL = "https://damianguilisasti.com.ar/";
var from = '"Damián Guilisasti" <hola@damianguilisasti.com.ar>';

var url = {
  host: "localhost",
  port: 4000,
  path: "/api/settings",
  method: "GET",
};
http
  .get(url, (resp) => {
    let data = "";
    resp.on("data", (chunk) => {
      data += chunk;
    });
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
    whatsappURL = bodyData.whatsapp.phone;
    linkedinURL = bodyData.socialMedia.linkedin;
    instagramURL = bodyData.socialMedia.instagram;
    twitterURL = bodyData.socialMedia.twitter;
    facebookURL = bodyData.socialMedia.facebook;
    googleURL = bodyData.socialMedia.google;
    youtubeURL = bodyData.socialMedia.youtube;
    companyName = bodyData.companyName;
    companyImg = bodyData.companyImg.imageURL;
    companyURL = bodyData.companyURL.imageURL;
  }
}

function whatsapp() {
  return (
    "https://wa.me/" +
    whatsappURL +
    "?text=Hola Damián, te quería consultar lo siguiente: " //modificar esto.
  );
}

/* export const transporter = nodemailer.createTransport({
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
}); */

export let transporter = nodemailer.createTransport({
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
});

transporter
  .verify()
  .then(() => {
    console.log("Conexión del envío de emails correcta");
  })
  .catch((error) => {
    console.log(error);
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
  sendBudget: (email, name) =>
    transporter.sendMail({
      from,
      to: email,
      subject: "Presupuesto Proyecto",
      template: "budget",
      context: {
        user: name,
        year: moment(new Date()).format("YYYY"),
        whatsappURL: whatsapp,
        linkedinURL,
        instagramURL,
        twitterURL,
        websiteURL,
        companyImg,
        logoURL,
        companyName,
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
      from,
      to: email,
      subject: subject,
      template: "bill",
      context: {
        user: name,
        year: moment(new Date()).format("YYYY"),
        month: moment(new Date()).format("MM/YYYY"),
        whatsappURL: whatsapp,
        linkedinURL,
        instagramURL,
        twitterURL,
        websiteURL,
        companyImg,
        logoURL,
        companyName,
      },
      attachments: [
        {
          filename: "Factura.PDF",
          path: path.join(__dirname, "../public/img/uploads/Factura.PDF"),
        },
      ],
    }),

  resetPassword: (email, name, subject, resetURL) =>
    transporter.sendMail({
      from,
      to: email,
      subject: subject,
      template: "forgotPassword",
      context: {
        resetURL: companyURL + resetURL,
        user: name,
        year: moment(new Date()).format("YYYY"),
        month: moment(new Date()).format("MM/YYYY"),
        whatsappURL: whatsapp,
        linkedinURL,
        instagramURL,
        twitterURL,
        websiteURL,
        companyImg,
        logoURL,
        companyName,
      },
    }),
};

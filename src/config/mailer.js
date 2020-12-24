import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";
import moment from "moment";
import http from "http";

let logo = "";
const SettingData = [];

var url = {
  host: "localhost",
  port: 3000,
  path: "/api/settings/list",
};

const httpGet = (url) => {
  return new Promise((resolve, reject) => {
    http
      .get(url, (res) => {
        res.setEncoding("utf8");
        const body = [];
        res.on("data", (chunk) => body.push(chunk));
        console.log(body);
        res.on("end", () => resolve(body.join("")));
      })
      .on("error", reject);
  });
};

//logo = response.data[0].logoURL.imageURL;

//import emailTemplate from '../template/email';

export const transporter = nodemailer.createTransport({
  host: "mail.damianguilisasti.com.ar",
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
      template: "email",
      context: {
        user: name,
        year: moment(new Date()).format("YYYY"),
        whatsappURL: "http://damianguilisasti.com.ar/facebook.png",
        linkedinURL: "http://damianguilisasti.com.ar/facebook.png",
        instagramURL: "http://damianguilisasti.com.ar/facebook.png",
        websiteURL: "http://damianguilisasti.com.ar/facebook.png",
        photoURL: "https://damianguilisasti.com.ar/damian.png",
        logoURL:
          "https://damianguilisasti.com.ar/wp-content/themes/chelsey/images/logo2.png",
      },
      attachments: [
        {
          filename: "Presupuesto.PDF",
          path: path.join(__dirname, "../public/img/uploads/Presupuesto.PDF"),
        },
      ],
    }),
};

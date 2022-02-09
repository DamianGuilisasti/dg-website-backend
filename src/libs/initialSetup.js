import Rol from "../models/Rol";
import User from "../models/User";
import Setting from "../models/Setting";

export default {
  createRoles: async () => {
    try {
      const counter = await Rol.countDocuments({}).exec();

      if (counter > 0) return;

      await Promise.all([
        new Rol({ name: "Client" }).save(),
        new Rol({ name: "Admin" }).save(),
      ]);
    } catch (error) {
      console.log(error);
    }
  },
  createFirstUser: async () => {
    try {
      const counter = await User.countDocuments({}).exec();

      if (counter > 0) return;

      const rolId = await Rol.find({ name: { $in: "Admin" } });

      let rol_id = "";

      rolId.map(function (i) {
        rol_id = i._id;
      });

      const firstUser = new User({
        name: process.env.name,
        lastname: process.env.lastname,
        username: process.env.username,
        email: process.env.userEmail,
        password: await User.encryptPassword(process.env.userPassword),
        rol: rol_id,
      });

      await firstUser.save();
    } catch (error) {
      console.log(error);
    }
  },
  initializeDatabase: async () => {
    try {
      const counter = await Setting.countDocuments({}).exec();

      if (counter > 0) return;

      const firstSetting = new Setting({
        aboutInfo: "",
        companyName: "",
        companyPhone: "",
        companyAddress: "",
        companyEmail: "",
        companyURL: "",
        companyImg: {
          public_id: "",
          imageURL: "",
        },
        socialMedia: {
          facebook: "",
          instagram: "",
          twitter: "",
          google: "",
          youtube: "",
          linkedin: "",
        },
        logoURL: {
          public_id: "",
          imageURL: "",
        },
        whatsapp: {
          phone: "",
          text: "",
        },
      });

      await firstSetting.save();
    } catch (error) {
      console.log(error);
    }
  },
};

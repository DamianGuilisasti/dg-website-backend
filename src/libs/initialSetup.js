import Rol from "../models/Rol";
import User from "../models/User";

export default {
  createRoles: async () => {
    try {
      const counter = await Rol.countDocuments({}).exec();

      if (counter > 0) return;

      await Promise.all([
        new Rol({ name: "Cliente" }).save(),
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
        username: "DamianGuilisasti",
        email: process.env.userEmail,
        password: await User.encryptPassword(process.env.userPassword),
        rol: rol_id,
      });

     await firstUser.save();

    } catch (error) {
      console.log(error);
    }
  },
};

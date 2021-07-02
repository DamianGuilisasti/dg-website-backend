import Roles from "../models/Roles";
import User from "../models/User";

export default {
  createRoles: async () => {
    try {
      const counter = await Roles.estimatedDocumentCount();

      if (counter > 0) return;

      const values = await Promise.all([
        new Roles({ name: "Cliente" }).save(),
        new Roles({ name: "Admin" }).save(),
      ]);
    } catch (error) {
      console.log(error);
    }
  },
  createFirstUser: async () => {
    try {
      const counter = await User.estimatedDocumentCount();

      if (counter > 0) return;

      const rolId = await Roles.find({ name: { $in: "Admin" } });

      let rol_id = "";

      rolId.map(function (i) {
        rol_id = i._id;
      });

      const values = await Promise.all(
        new User({
          username: "DamianGuilisasti",
          email: process.env.userEmail,
          password: await User.encryptPassword(process.env.userPassword),
          rol: rol_id,
        }).save()
      );
    } catch (error) {
      console.log(error);
    }
  },
};

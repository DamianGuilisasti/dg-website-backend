import jwt from "jsonwebtoken";
import User from "../models/User";
import Roles from "../models/Rol";
import config from "../config";

export default {
  isAdmin: async (req, res, next) => {
    const token = req.headers.token;
    const tokenDecoded = jwt.verify(token, config.SECRET);
    const user = await User.findById(tokenDecoded.id).populate("rol");
    const roles = await Roles.find({ _id: { $in: user.rol } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "Admin") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Requiere Admin" });
  },

  isClient: async (req, res, next) => {
    const token = req.headers.token;
    const tokenDecoded = jwt.verify(token, config.SECRET);
    const user = await User.findById(tokenDecoded.id).populate("rol");
    const roles = await Roles.find({ _id: { $in: user.rol } });

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "Cliente") {
        next();
        return;
      }
    }

    return res.status(403).json({ message: "Requiere Cliente" });
  },
};


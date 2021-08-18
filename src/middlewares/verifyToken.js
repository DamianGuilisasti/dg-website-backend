import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/User";

export default {
  verify: async (req, res, next) => {
    try {
      const token = req.headers.token;

      if (!token) {
        return res.status(403).send({
          message: "No token",
        });
      }

      const tokenDecoded = jwt.verify(token, config.SECRET);

      const user = await User.findById(tokenDecoded.id);

      if (!user) return res.status(404).json({ message: "No user found" });

      next();
    } catch (error) {

      return res.status(401).json({ message: "No autorizado" });
    }
  },
};

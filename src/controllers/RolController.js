import Roles from "../models/Roles";

export default {
  list: async (req, res, next) => {
    try {
      const result = await Roles.find();
      res.status(200).json(result);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  }

};

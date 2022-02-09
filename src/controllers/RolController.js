import Rol from "../models/Rol";

export default {
  list: async (req, res, next) => {
    try {
      const result = await Rol.find();
      res.status(200).json(result);
    } catch (e) {
      res.status(500).send({
        message: "An error has occured",
      });
      next(e);
    }
  },
};

import Rol from "../models/Rol";
const { httpError } = require("../helpers/handleError");

export default {
  list: async (req, res, next) => {
    try {
      const result = await Rol.find();
      res.status(200).json(result);
    } catch (error) {
      httpError(res, error, next);
    }
  },
};

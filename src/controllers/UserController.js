import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Roles from "../models/Roles";

export default {
  login: async (req, res, next) => {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email: email }).populate("rol");

    if (!userFound) {
      return res.status(404).send({
        message: "No se encontró al usuario",
      });
    }
    const matchPassword = await User.comparePassword(
      password,
      userFound.password
    );

    if (!matchPassword)
      return res
        .status(401)
        .json({ token: null, message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: userFound._id }, config.SECRET, {
      expiresIn: 86400,
    });

    res.status(200).json({ token });
  },
  register: async (req, res, next) => {
    try {
      const { username, email, password, rol } = req.body;

      const newUser = new User({
        username,
        email,
        password: await User.encryptPassword(password),
      });

      if (rol) {
        const foundRoles = await Roles.find({
          name: { $in: rol },
        });
        newUser.rol = foundRoles.map((rol) => rol._id);
      } else {
        const role = await Roles.findOne({ name: "Cliente" });
        newUser.rol = [role._id];
      }

      const newUserSaved = await newUser.save();

      const token = jwt.sign({ id: newUserSaved._id }, config.SECRET, {
        expiresIn: 86400,
      });

      res.status(200).json(token);
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
  list: async (req, res, next) => {
    try {
      const reg = await User.find().populate("rol", {
        name: 1,
        _id: 1,
      });
      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next(e);
    }
  },
  add: async (req, res, next) => {
    try {
      const {
        name,
        lastname,
        email,
        username,
        password,
        rol,
        state,
      } = req.body;

      const newUser = new User({
        name,
        lastname,
        email,
        rol,
        username,
        state,
        password: await User.encryptPassword(password),
      });
      const userSaved = await newUser.save();
      res.status(200).json(userSaved);
      //const reg = await models.Post.create(req.body);
      //res.status(200).json(reg);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Ocurrió un error",
      });
      next();
    }
  },
  update: async (req, res, next) => {
    try {
      const {
        email,
        password,
        newpassword,
        username,
        name,
        lastname,
        rol,
      } = req.body;

      const userFound = await User.findOne({ email: email }).populate("rol");

      console.log(userFound);

/*       if (userFound.rol[0].name !== "Admin") {
        return res.status(401).json({ message: "No autorizado" });
      } */

      const matchPassword = await User.comparePassword(
        password,
        userFound.password
      );

      if (!matchPassword) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      const userUpdated = await User.findByIdAndUpdate(
        { _id: req.body._id },
        {
          name: name,
          lastname: lastname,
          email: email,
          rol: rol,
          username: username,
          password: await User.encryptPassword(newpassword),
        },
        { new: true }
      );

      res.status(200).json(userUpdated);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  activate: async (req, res, next) => {
    try {
      const userUpdated = await User.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 1 },
        { new: true }
      );
      res.status(200).json(userUpdated);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  desactivate: async (req, res, next) => {
    try {
      const userUpdated = await User.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 0 },
        { new: true }
      );
      res.status(200).json(userUpdated);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
      const reg = await User.findByIdAndDelete({ _id: req.query.id });
      res.status(200).json(reg);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  query: async (req, res, next) => {
    try {
      const userId = req.query;
      const userFound = await User.findOne({ _id: userId }).populate("rol");
      res.status(200).json(userFound);
    } catch (error) {
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
};

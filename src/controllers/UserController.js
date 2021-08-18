import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Roles from "../models/Roles";
import nodemailer from "../config/mailer";
import crypto from "crypto";

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

    const token = jwt.sign(
      { id: userFound._id, rol: userFound.rol },
      config.SECRET,
      {
        expiresIn: 86400,
      }
    );

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
      const { name, lastname, email, username, password, rol, state } =
        req.body;

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
  updateInEditAccount: async (req, res, next) => {
    try {
      const { email, password, newpassword, username, name, lastname, rol } =
        req.body;

      const userFound = await User.findOne({ email: email }).populate("rol");

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
  update: async (req, res, next) => {
    try {
      const { email, password, username, name, lastname, rol } = req.body;

      const userUpdated = await User.findByIdAndUpdate(
        { _id: req.body._id },
        {
          name: name,
          lastname: lastname,
          email: email,
          rol: rol,
          username: username,
          password: await User.encryptPassword(password),
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
      console.log(error);
      res.status(500).send({
        message: "Ocurrió un error.",
      });
      next(error);
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      const userFound = await User.findOne({ email: req.body.email });

      if (userFound) {
        try {
          let email = userFound.email;
          let name = userFound.name;
          let subject = "Restablecer la contraseña | Damián Guilisasti";

          let resetToken = await User.createPasswordResetToken();
          let passwordResetToken = await User.encryptPasswordResetToken(
            resetToken
          ); //save the encrypted token on the database for mayor security.
          let passwordResetExpires = await User.getPasswordResetExpires(); //get the date to allow the customer to reset the password for up to 10 mins

          await User.findOneAndUpdate(
            { email: email },
            { passwordResetExpires, passwordResetToken }
          );

          let resetURL = `/resetpassword/${resetToken}`;

          await nodemailer.resetPassword(email, name, subject, resetURL);

          res.status(200).send({
            message: "Email enviado al cliente",
          });
        } catch (error) {
          res.status(500).send({
            message:
              "There is an error when try to update db and send the email to restore de password.",
          });
          next(error);
        }
      } else {
        res.status(404).send({
          message: "No se encontró un usuario con ese email.",
        });
        next(error);
      }
    } catch (error) {
      res.status(500).send({
        message:
          "There is an error when try to update db and send the email to restore de password.",
      });
      next(error);
    }
  },

  resetPassword: async (req, res, next) => {
    try {
      const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

      const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(404).send({
          message: "There is not user with this email.",
        });
      }

      if (req.body.password === req.body.confirmpassword) {
        let newPassword = await User.encryptPassword(req.body.password);

        await User.findOneAndUpdate(
          { email: user.email },
          {
            password: newPassword,
            passwordResetExpires: undefined,
            passwordResetToken: undefined,
          }
        );
      }

      res.status(200).send({ message: "Password updated successfully" });
    } catch (error) {
      res.status(500).send({
        message: "There is an error when try to restore the password",
      });
      next(error);
    }
  },
};

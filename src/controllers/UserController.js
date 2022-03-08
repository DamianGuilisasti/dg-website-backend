import User from "../models/User";
import jwt from "jsonwebtoken";
import config from "../config";
import Roles from "../models/Rol";
import nodemailer from "../config/mailer";
import crypto from "crypto";
const { httpError } = require("../helpers/handleError");

export default {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const userFound = await User.findOne({ email: email }).populate("rol");

      if (!userFound) {
        return res.status(404).send({
          message: "User Not Found",
        });
      }
      const matchPassword = await User.comparePassword(
        password,
        userFound.password
      );

      if (!matchPassword)
        return res.status(401).json({ token: null, message: "Wrong Password" });

      const token = jwt.sign(
        { id: userFound._id, name: userFound.name, rol: userFound.rol },
        config.SECRET,
        {
          expiresIn: 86400,
        }
      );

      res.status(200).json({ token });
    } catch (error) {
      httpError(res, error, next);
    }
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
        const role = await Roles.findOne({ name: "Client" });
        newUser.rol = [role._id];
      }

      const newUserSaved = await newUser.save();

      const token = jwt.sign({ id: newUserSaved._id }, config.SECRET, {
        expiresIn: 86400,
      });

      res.status(200).json(token);
    } catch (error) {
      httpError(res, error, next);
    }
  },
  list: async (req, res, next) => {
    try {
      const reg = await User.find().populate("rol", {
        name: 1,
        _id: 1,
      });
      res.status(200).json(reg);
    } catch (error) {
      httpError(res, error, next);
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
    } catch (error) {
      httpError(res, error, next);
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
        return res.status(401).json({ message: "Wrong Password" });
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
      httpError(res, error, next);
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
      httpError(res, error, next);
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
      httpError(res, error, next);
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
      httpError(res, error, next);
    }
  },
  delete: async (req, res, next) => {
    try {
      const reg = await User.findByIdAndDelete({ _id: req.query.id });
      res.status(200).json(reg);
    } catch (error) {
      httpError(res, error, next);
    }
  },
  query: async (req, res, next) => {
    try {
      const userId = req.query;
      const userFound = await User.findOne({ _id: userId }).populate("rol");
      res.status(200).json(userFound);
    } catch (error) {
      httpError(res, error, next);
    }
  },
  forgotPassword: async (req, res, next) => {
    try {
      const userFound = await User.findOne({ email: req.body.email });

      if (userFound) {
        try {
          let email = userFound.email;
          let name = userFound.name;
          let subject = "Restablecer la contraseña";

          let resetToken = await User.createPasswordResetToken();
          let passwordResetToken = await User.encryptPasswordResetToken(
            resetToken
          );
          let passwordResetExpires = await User.getPasswordResetExpires();

          await User.findOneAndUpdate(
            { email: email },
            { passwordResetExpires, passwordResetToken }
          );

          let resetURL = `/resetpassword/${resetToken}`;

          await nodemailer.resetPassword(email, name, subject, resetURL);

          res.status(200).send({
            message: "Email Sent",
          });
        } catch (error) {
          res.status(500).send({
            message:
              "There is an error when try to update db and send the email to restore de password",
          });
          return next(error);
        }
      } else {
        res.status(404).send({
          message: "User Not Found",
        });
        return next(error);
      }
    } catch (error) {
      res.status(500).send({
        message:
          "There is an error when try to update db and send the email to restore de password.",
      });
      return next(error);
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
          message: "There is not user with this email",
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
      return next(error);
    }
  },
};

import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      unique: true,
      required: true,
      default: "",
    },
    email: {
      type: String,
      unique: true,
      required: true,
      default: "",
    },
    password: {
      type: String,
      required: true,
      default: "",
    },
    passwordResetToken: {
      type: String,
      default: "",
    },
    passwordResetExpires: {
      type: Date,
      default: "",
    },
    rol: [
      {
        ref: "Rol",
        type: Schema.Types.ObjectId,
      },
    ],
    state: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
    collection: "Users",
  }
);

UserSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

UserSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword);
};

UserSchema.statics.createPasswordResetToken = async () => {
  const resetToken = await crypto.randomBytes(32).toString("hex");
  return resetToken;
};

UserSchema.statics.encryptPasswordResetToken = (resetToken) => {
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  return passwordResetToken;
};
UserSchema.statics.getPasswordResetExpires = () => {
  return Date.now() + 10 * 60 * 1000;
};

module.exports = model("User", UserSchema);

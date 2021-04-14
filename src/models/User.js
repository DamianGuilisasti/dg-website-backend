import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const UserSchema = new Schema(
  {
    name: {
      type: String,
    },
    lastname: {
      type: String,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetExpires: {
      type: Date,
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
  //statics son funciones.
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

export default model("User", UserSchema);

import User from "../models/User";

export default {
  checkDuplicateUsernameOrEmail: async (req, res, next) => {
    const user = await User.findOne({ username: req.body.username });
    const email = await User.findOne({ email: req.body.email });

    if (user) return res.status(400).json({ message: "El usuario ya existe" });
    if (email) return res.status(400).json({ message: "El email ya existe" });

    next();
  },
};

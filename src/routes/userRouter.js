import { Router } from "express";
import userController from "../controllers/userController";
import verify from "../middlewares";
import { checkDuplicateUsernameOrEmail } from "../middlewares/verifyRegister.js";

const router = Router();

router.post("/login", userController.login);
router.post(
  "/register",
  checkDuplicateUsernameOrEmail,
  userController.register
);
router.get(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  userController.list
);
router.post(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  userController.add
);
router.put(
  "/updateInEditAccount",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  userController.updateInEditAccount
);
router.put(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  userController.update
);
router.put(
  "/activate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  userController.activate
);
router.put(
  "/desactivate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  userController.desactivate
);
router.delete(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  userController.delete
);
router.get("/user", [verify.verifyToken.verify], userController.query);
router.post("/forgotPassword", userController.forgotPassword);
router.post("/resetPassword/:token", userController.resetPassword);

export default router;

import { Router } from "express";
import UserController from "../controllers/UserController";
import verify from "../middlewares";

const router = Router();

router.post("/login", UserController.login);
router.post(
  "/register",
  verify.verifyRegister.checkDuplicateUsernameOrEmail,
  UserController.register
);
router.get(
  "/list",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  UserController.list
);
router.post(
  "/add",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  UserController.add
);
router.put(
  "/updateInEditAccount",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  UserController.updateInEditAccount
);
router.put(
  "/update",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  UserController.update
);
router.put(
  "/activate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  UserController.activate
);
router.put(
  "/desactivate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  UserController.desactivate
);
router.delete(
  "/remove",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  UserController.delete
);
router.get("/query", [verify.verifyToken.verify], UserController.query);

export default router;

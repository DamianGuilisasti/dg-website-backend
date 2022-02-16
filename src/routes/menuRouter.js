import express from "express";
import menuController from "../controllers/menuController";
import verify from "../middlewares";

const router = express.Router();

router.get("/", menuController.list);
router.post(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  menuController.create
);
router.put(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  menuController.updateMenuById
);
router.put(
  "/activate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  menuController.activateMenuById
);
router.put(
  "/desactivate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  menuController.desactivateMenuById
);
router.delete(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  menuController.deleteMenuById
);
router.post(
  "/saveNewOrder",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  menuController.saveNewOrder
);

export default router;

import express from "express";
import LogosController from "../controllers/LogosController";
import upload from "../middlewares/upload";
import verify from "../middlewares";

const router = express.Router();

router.get("/list", LogosController.list);
router.post(
  "/add",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  upload,
  LogosController.add
);
router.put(
  "/activate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  LogosController.activateLogoById
);
router.put(
  "/desactivate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  LogosController.desactivateLogoById
);
router.delete(
  "/delete",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  LogosController.deleteLogoById
);
router.post(
  "/updateIndex",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  LogosController.updateIndex
);

export default router;

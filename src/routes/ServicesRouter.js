import express from "express";
import verify from "../middlewares";
import ServicesController from "../controllers/ServicesController";

const router = express.Router();

router.get(
  "/list",
  ServicesController.list
);
router.post(
  "/add",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  ServicesController.add
);
router.put(
  "/update",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  ServicesController.updateServiceById
);
router.put(
  "/activate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  ServicesController.activateServiceById
);
router.put(
  "/desactivate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  ServicesController.desactivateServiceById
);
router.delete(
  "/delete",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  ServicesController.deleteServiceById
);

export default router;

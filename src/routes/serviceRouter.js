import serviceController from "../controllers/serviceController";
import express from "express";
import verify from "../middlewares";
import upload from "../middlewares/uploadMultipleFiles";

const router = express.Router();

router.get("/", serviceController.list);
router.post("/", serviceController.add);
router.get("/service", serviceController.getService);
router.post(
  "/uploadimage",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  upload,
  serviceController.uploadimage
);
router.put(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  serviceController.updateServiceById
);
router.put(
  "/activate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  serviceController.activateServiceById
);
router.put(
  "/desactivate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  serviceController.desactivateServiceById
);
router.delete(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  serviceController.deleteServiceById
);

export default router;

import express from "express";
import verify from "../middlewares";
import clientServicesController from "../controllers/clientServicesController";

const router = express.Router();

router.get("/", clientServicesController.list);
router.post(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  clientServicesController.add
);
router.put(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  clientServicesController.updateServiceById
);
router.put(
  "/activate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  clientServicesController.activateServiceById
);
router.put(
  "/desactivate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  clientServicesController.desactivateServiceById
);
router.delete(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  clientServicesController.deleteServiceById
);

export default router;

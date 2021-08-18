import express from "express";
import ClientsController from "../controllers/ClientsController";
import verify from "../middlewares";

const router = express.Router();

router.get("/list", ClientsController.list);
router.post(
  "/add",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  ClientsController.add
);
router.put(
  "/update",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  ClientsController.updateClientById
);
router.put(
  "/activate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  ClientsController.activateClientById
);
router.put(
  "/desactivate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  ClientsController.desactivateClientById
);
router.delete(
  "/delete",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  ClientsController.deleteClientById
);
router.put(
  "/clientIsPaid",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  ClientsController.clientPaidById
);
router.put(
  "/clientIsNotPaid",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  ClientsController.clientNotPaidById
);

export default router;

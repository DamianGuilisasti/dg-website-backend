import express from "express";
import clientController from "../controllers/clientController";
import verify from "../middlewares";

const router = express.Router();

router.get("/", clientController.list);
router.get("/getmonthlypayments", clientController.getMonthlyPayments);
router.get("/getannualpayments", clientController.getAnnualPayments);
router.post(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  clientController.add
);
router.put(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  clientController.updateClientById
);
router.put(
  "/activate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  clientController.activateClientById
);
router.put(
  "/desactivate",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  clientController.desactivateClientById
);
router.delete(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  clientController.deleteClientById
);
router.put(
  "/clientIsPaid",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  clientController.clientPaidById
);
router.put(
  "/clientIsNotPaid",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  clientController.clientNotPaidById
);

export default router;

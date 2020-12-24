import express from "express";
import ClientsController from "../controllers/ClientsController";

const router = express.Router();

router.get("/list", ClientsController.list);
router.post("/add", ClientsController.add);
router.put("/update", ClientsController.updateClientById);
router.put("/activate", ClientsController.activateClientById);
router.put("/desactivate", ClientsController.desactivateClientById);
router.delete("/delete", ClientsController.deleteClientById);

export default router;

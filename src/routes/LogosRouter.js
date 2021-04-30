import express from "express";
import LogosController from "../controllers/LogosController";
import upload from "../middlewares/upload";

const router = express.Router();

router.get("/list", LogosController.list);
router.post("/add", upload, LogosController.add);
router.put("/activate", LogosController.activateLogoById);
router.put("/desactivate", LogosController.desactivateLogoById);
router.delete("/delete", LogosController.deleteLogoById);

export default router;

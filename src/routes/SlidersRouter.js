import express from "express";
import SlidersController from "../controllers/SlidersController";
import upload from "../middlewares/upload";

const router = express.Router();

router.get("/list", SlidersController.list);
router.post("/add", upload, SlidersController.add);
router.put("/update", SlidersController.updateSliderById);
router.put("/activate", SlidersController.activateSliderById);
router.put("/desactivate", SlidersController.desactivateSliderById);
router.delete("/delete", SlidersController.deleteSliderById);

export default router;

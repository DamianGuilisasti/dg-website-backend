import express from "express";
import verify from "../middlewares";
import RolController from "../controllers/RolController";

const router = express.Router();

router.get("/list", RolController.list);

export default router;

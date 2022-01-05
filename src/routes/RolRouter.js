import express from "express";
import rolController from "../controllers/rolController";

const router = express.Router();

router.get("/", rolController.list);

export default router;

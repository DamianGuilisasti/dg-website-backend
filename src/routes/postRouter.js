import express from "express";
import postController from "../controllers/postController";
import verify from "../middlewares";

const router = express.Router();

router.get("/", postController.list);
router.post(
  "/",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  postController.add
);

export default router;

import express from "express";
import PostsController from "../controllers/PostsController";
import verify from "../middlewares";

const router = express.Router();

router.get("/list", PostsController.list);
router.post(
  "/add",
  [verify.verifyToken.verify, verify.verifyRole.isAdmin],
  PostsController.add
);

export default router;

import express from "express";
import PostsRouter from "./PostsRouter";
import ProductRouter from "./ProductRouter";
import UsersRouter from "./UsersRouter";
import SettingsRouter from "./SettingsRouter";
import ClientsRouter from "./ClientsRouter";
import ServicesRouter from "./ServicesRouter";
import BudgetsRouter from "./BudgetsRouter";
import ExpensesRouter from "./ExpensesRouter";
import RolRouter from "./RolRouter";

const router = express.Router();

router.use("/posts", PostsRouter);
router.use("/products", ProductRouter);
router.use("/user", UsersRouter);
router.use("/settings", SettingsRouter);
router.use("/clients", ClientsRouter);
router.use("/services", ServicesRouter);
router.use("/budgets", BudgetsRouter);
router.use("/expenses", ExpensesRouter);
router.use("/roles", RolRouter);

export default router;

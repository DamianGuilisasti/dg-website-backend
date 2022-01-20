import express from "express";
import postRouter from "./postRouter";
import userRouter from "./userRouter";
import settingRouter from "./settingRouter";
import clientRouter from "./clientRouter";
import clientServicesRouter from "./clientServicesRouter";
import serviceRouter from "./serviceRouter";
import budgetRouter from "./budgetRouter";
import expenseRouter from "./expenseRouter";
import rolRouter from "./rolRouter";
import sliderRouter from "./sliderRouter";
import portfolioSliderRouter from "./portfolioSliderRouter";
import portfolioCategoriesRouter from "./portfolioCategoriesRouter";
import logoRouter from "./logoRouter";
import portfolioRouter from "./portfolioRouter";
import reviewRouter from "./reviewRouter";

const router = express.Router();

router.use("/posts", postRouter);
router.use("/users", userRouter);
router.use("/settings", settingRouter);
router.use("/clients", clientRouter);
router.use("/clientservices", clientServicesRouter);
router.use("/services", serviceRouter);
router.use("/budgets", budgetRouter);
router.use("/expenses", expenseRouter);
router.use("/roles", rolRouter);
router.use("/sliders", sliderRouter);
router.use("/logos", logoRouter);
router.use("/portfolios", portfolioRouter);
router.use("/portfoliosliders", portfolioSliderRouter);
router.use("/portfoliocategories", portfolioCategoriesRouter);
router.use("/reviews", reviewRouter);

export default router;

import { Router, type IRouter } from "express";
import healthRouter from "./health";
import candidaturaRouter from "./candidatura";

const router: IRouter = Router();

router.use(healthRouter);
router.use(candidaturaRouter);

export default router;

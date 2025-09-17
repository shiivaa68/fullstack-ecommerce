import { Router } from "express";
import { healthCheck } from "../controllers/health.controller";

const router = Router();

//get /api/health
router.get("/", healthCheck);

export default router;

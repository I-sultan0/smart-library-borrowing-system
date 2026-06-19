import express from "express";
import authMiddleware from "../middleware/middleware.js";

import { dashboardCtrl } from "../controllers/DashboardController.js";

const router = express.Router();

router.get("/", authMiddleware, dashboardCtrl);

export default router;

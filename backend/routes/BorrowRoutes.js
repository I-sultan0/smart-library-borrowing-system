import express from "express";
import {
  borrowCtrl,
  borrowSummaryCtrl,
  returnCtrl,
} from "../controllers/BorrowController.js";
import authMiddleware from "../middleware/middleware.js";

const router = express.Router();

router.post("/", authMiddleware, borrowCtrl);
router.post("/:borrowId/submit", authMiddleware, returnCtrl);
router.get("/:borrowId/summary", authMiddleware, borrowSummaryCtrl);

export default router;

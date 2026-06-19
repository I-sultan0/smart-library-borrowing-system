import { Router } from "express";
import {
  loginCtrl,
  profileCtrl,
  signupCtrl,
} from "../controllers/AuthControllers.js";
import authMiddleware from "../middleware/middleware.js";

const router = Router();
router.post("/signup", signupCtrl);
router.post("/login", loginCtrl);
router.get("/profile", authMiddleware, profileCtrl);

export default router;

import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
} from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/authMiddleware.js";
import upload from "../config/uploadMiddleware.js";

const router = Router();

router.post("/register", upload.single("profileImage"), registerUser);
router.post("/login", loginUser);
router.get("/profile", isLoggedIn, getUserProfile);

export default router;

import express  from "express";
import { register, login } from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router()

router.post("/login", login)
router.post("/register", verifyToken, register)

export default router


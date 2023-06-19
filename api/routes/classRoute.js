import express from "express";
import {
  getClass,
  getClasses,
  createClass,
  updateClass,
  deleteClass,
} from "../controllers/classController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getClasses);
router.get("/:id", getClass);
router.post("/create", verifyToken, createClass);
router.put("/update/:id",verifyToken,  updateClass);
router.delete("/delete/:id",verifyToken,  deleteClass);

export default router;

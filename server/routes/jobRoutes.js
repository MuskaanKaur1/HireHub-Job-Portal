import express from "express";
import { createJob, getJobs, deleteJob } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";


const router = express.Router();

router.post("/create", protect,adminOnly, createJob);
router.get("/", getJobs);
router.delete("/:id", protect, adminOnly, deleteJob);

export default router; 
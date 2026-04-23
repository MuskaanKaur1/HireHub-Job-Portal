import express from "express";
import { createJob, getJobs, deleteJob, updateJob } from "../controllers/jobController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";


const router = express.Router();

router.post("/create", protect,adminOnly, createJob);
router.get("/", getJobs);
router.delete("/:id", protect, adminOnly, deleteJob);
router.put("/:id", protect, adminOnly, updateJob);


export default router; 

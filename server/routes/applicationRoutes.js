import express from "express";
import { applyJob, getMyApplications , withdrawApplication } from "../controllers/applicationController.js";
import Application from "../models/Application.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/apply/:jobId", protect, applyJob);
router.get("/my-applications", protect, getMyApplications);
router.delete("/withdraw/:id", protect, withdrawApplication);

export default router;

import express from "express";
import upload from "../middleware/upload.js";
import {
  createIssue,
  getAllIssues,
  getUserIssues,
  getStats,
  getIssueById,
  updateIssueStatus,
  uploadWorkProof,
  getWorkerIssues
} from "../controller/issueController.js";
import { protect, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Citizens report issues (must be authenticated)
router.post("/report", protect, upload.single("image"), createIssue);

// Workers view assigned issues
router.get("/worker", protect, requireRole("worker", "admin"), getWorkerIssues);

// Citizens view their own issues
router.get("/user/:username", protect, getUserIssues);

// Public issues feed (accessible by anyone)
router.get("/all", getAllIssues);

// Public landing page views stats
router.get("/stats", getStats);

// Get issue by ID (accessible by anyone)
router.get("/:id", getIssueById);

// Admin updates issue status (e.g. In Progress, Resolved)
router.put("/:id/status", protect, requireRole("admin"), updateIssueStatus);

// Workers upload work proof
router.put("/:id/work-proof", protect, requireRole("worker"), upload.single("image"), uploadWorkProof);

export default router;

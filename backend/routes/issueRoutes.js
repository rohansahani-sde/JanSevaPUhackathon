import express from "express";
import upload from "../middleware/upload.js";
import { createIssue, getAllIssues, getUserIssues, getStats, getIssueById, updateIssueStatus,uploadWorkProof, getWorkerIssues } from "../controller/issueController.js";
import { protect } from "../middleware/protect.js";


const router = express.Router();

router.post("/report", upload.single("image"), createIssue);

router.get("/worker", getWorkerIssues);

router.get("/user/:username", getUserIssues);
router.get("/all", getAllIssues);
router.get("/stats",  getStats);
router.get("/:id",  getIssueById);

router.put("/:id/status",  updateIssueStatus);

router.put("/:id/work-proof", upload.single("image"), uploadWorkProof );





export default router;

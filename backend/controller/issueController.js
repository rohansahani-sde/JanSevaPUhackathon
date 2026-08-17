import Issue from "../model/Issue.js";

const allowedStatuses = ["Pending", "In Progress", "Resolved"];

const uploadedFileUrl = (file, req) => {
  if (!file) return "";
  if (file.path?.startsWith("http")) return file.path;
  if (file.secure_url) return file.secure_url;
  if (file.filename) return `${req.protocol}://${req.get("host")}/uploads/${file.filename}`;
  return file.path || "";
};

export const createIssue = async (req, res) => {
  try {
    const { location, description, issuetype, username } = req.body;
    const image = uploadedFileUrl(req.file, req);

    if (!image) {
      return res.status(400).json({ success: false, message: "Issue image is required" });
    }

    if (!location || !description || !issuetype) {
      return res.status(400).json({
        success: false,
        message: "Location, description, and issue type are required",
      });
    }

    const issue = await Issue.create({
      image,
      location,
      description,
      issuetype,
      username: username || "Anonymous Citizen",
    });

    res.status(201).json({ success: true, issue });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllIssues = async (_req, res) => {
  try {
    const issues = await Issue.find().sort({ date_created: -1 });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getStats = async (_req, res) => {
  try {
    const total = await Issue.countDocuments();
    const pending = await Issue.countDocuments({ status: "Pending" });
    const inProgress = await Issue.countDocuments({ status: "In Progress" });
    const resolved = await Issue.countDocuments({ status: "Resolved" });

    res.json({
      success: true,
      stats: { total, pending, inProgress, resolved },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ success: false, message: "Issue not found" });
    }

    res.json({ success: true, issue });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ success: false, message: "Issue not found" });
    }

    if (status === "Resolved" && !issue.workerImage) {
      return res.status(400).json({
        success: false,
        message: "Worker proof image is required before resolving",
      });
    }

    issue.status = status;
    await issue.save();

    res.json({ success: true, issue, status: issue.status });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};

export const getUserIssues = async (req, res) => {
  try {
    const { username } = req.params;
    const issues = await Issue.find({ username }).sort({ date_created: -1 });

    res.status(200).json({
      success: true,
      count: issues.length,
      issues,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const uploadWorkProof = async (req, res) => {
  try {
    const { id } = req.params;
    const { workerNote } = req.body;
    const workerImage = uploadedFileUrl(req.file, req);

    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ success: false, message: "Issue not found" });
    }

    if (!workerImage) {
      return res.status(400).json({ success: false, message: "Image required" });
    }

    issue.workerImage = workerImage;
    issue.workerNote = workerNote || "";
    issue.workerUpdatedAt = new Date();
    issue.status = "Resolved";

    await issue.save();

    res.json({
      success: true,
      issue,
      workerImage: issue.workerImage,
      message: "Work proof uploaded successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Upload failed" });
  }
};

export const getWorkerIssues = async (_req, res) => {
  try {
    const issues = await Issue.find({ status: "In Progress" }).sort({ date_created: -1 });
    res.json({ success: true, issues });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message || "Server error" });
  }
};

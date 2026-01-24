import cloudinary from "../config/cloudinary.js";
import Issue from "../model/Issue.js";

export const createIssue = async (req, res) => {
  try {
    const { location, description, issuetype, username } = req.body;

    const issue = await Issue.create({
      image: req.file.path,
      location,
      description,
      issuetype,
      username
    });
    // console.log(req)

    res.status(201).json({
      success: true,
      issue,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find().sort({ date_created: -1 });
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getStats = async (req, res) =>{
    try {
    const total = await Issue.countDocuments();
    const pending = await Issue.countDocuments({ status: "Pending" });
    const inProgress = await Issue.countDocuments({ status: "In Progress" });
    const resolved = await Issue.countDocuments({ status: "Resolved" });

    res.json({
      success: true,
      stats: { total, pending, inProgress, resolved }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
}


export const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    res.json({ success: true, issue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



export const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    // ❌ Don't allow resolve without worker image
    if (status === "Resolved" && !issue.workerImage) {
      return res.status(400).json({
        message: "Worker image required before resolving"
      });
    }

    issue.status = status;
    await issue.save();

    res.json({
      success: true,
      status: issue.status
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



export const getUserIssues = async (req, res) => {
  try {
    const { username } = req.params;

    const issues = await Issue.find({ username })
      .sort({ date_created: -1 });

    res.status(200).json({
      success: true,
      count: issues.length,
      issues,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const uploadWorkProof = async (req, res) => {
  try {
    const { id } = req.params;
    const { workerNote } = req.body;

    const issue = await Issue.findById(id);
    if (!issue) {
      return res.status(404).json({ message: "Issue not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image required" });
    }

    // ✅ multer-storage-cloudinary already uploaded image
    issue.workerImage = req.file.path; // 🔥 Cloudinary URL
    issue.workerNote = workerNote;
    issue.workerUpdatedAt = new Date();
    issue.status = "In Progress";

    await issue.save();

    res.json({
      success: true,
      workerImage: issue.workerImage,
      message: "Work proof uploaded successfully",
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
};


// controller/issueController.js
export const getWorkerIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ status: "In Progress" })
      .sort({ date_created: -1 });

    res.json({ issues });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


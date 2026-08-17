import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  issuetype: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    default: "Anonymous Citizen",
    trim: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending",
  },
  workerImage: {
    type: String,
  },
  workerNote: {
    type: String,
    trim: true,
  },
  workerUpdatedAt: {
    type: Date,
  },
  date_created: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Issue", issueSchema);

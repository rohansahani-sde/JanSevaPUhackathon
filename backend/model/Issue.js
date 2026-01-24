import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true // citizen image
  },
  location: String,
  issuetype: String,
  description: String,
  username: String,

  status: {
    type: String,
    enum: ["Pending", "In Progress", "Resolved"],
    default: "Pending"
  },

  // 👷 Worker proof
  workerImage: {
    type: String, // uploaded after work done
  },
  workerNote: {
    type: String,
  },
  workerUpdatedAt: {
    type: Date,
  },

  date_created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Issue", issueSchema);


// import mongoose from "mongoose";

// const issueSchema = new mongoose.Schema({
//   image: {
//     type: String,
//     required: true
//   },
//   location: {
//     type: String,
//     required: true
//   },
//   issuetype: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   username: {
//     type: String
//   },
//   status: {
//     type: String,
//     enum: ["Pending", "In Progress", "Resolved"],
//     default: "Pending"
//   },
//   date_created: {
//     type: Date,
//     default: Date.now
//   }
// });

// export default mongoose.model("Issue", issueSchema);

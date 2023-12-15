const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    owner_github_id: { type: String, required: true },
    repoId: { type: String, required: true },
    tickets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
      },
    ],
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;

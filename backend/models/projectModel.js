const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    owner_github_id: { type: String, required: true },
    repoId: { type: String, required: true },
    repoLink: { type: String, required: true },
    tickets: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
      },
    ],
    bugs: { type: Number, default: 0 },
    features: { type: Number, default: 0 },
    openTickets: { type: Number, default: 0 },
    closedTickets: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;

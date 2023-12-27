const express = require("express");
const router = express.Router();
const {
  getProjects,
  getProject,
  addProject,
  deleteProject,
  updateProject,
} = require("../controllers/projectController");

router.get("/getProjects", getProjects);
router.get("/getProject/:projectId", getProject);
router.post("/addProject", addProject);
router.delete("/deleteProject/:projectId", deleteProject);
router.patch("/:projectId", updateProject);

module.exports = router;

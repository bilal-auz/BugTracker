const express = require("express");
const router = express.Router();
const {
  getProjects,
  getProject,
  addProject,
} = require("../controllers/projectController");

router.get("/getProjects", getProjects);
router.get("/getProject/:projectId", getProject);
router.post("/addProject", addProject);

module.exports = router;

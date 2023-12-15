const express = require("express");
const router = express.Router();
const { getProjects, addProject } = require("../controllers/projectController");

router.get("/getProjects", getProjects);
router.post("/addProject", addProject);

module.exports = router;

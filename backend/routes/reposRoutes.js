const express = require("express");
const router = express.Router();
const { getRepos } = require("../controllers/repoController");

router.get("/getRepos", getRepos);

module.exports = router;

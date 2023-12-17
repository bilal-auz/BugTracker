const express = require("express");
const router = express.Router();
const { getRepos, getPinnedRepos } = require("../controllers/repoController");

router.get("/getRepos", getRepos);
router.post("/getPinnedRepos", getPinnedRepos);

module.exports = router;

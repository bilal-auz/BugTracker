const express = require("express");
const router = express.Router();
const { authCallback } = require("../controllers/authController");

router.post("/callback", authCallback);

module.exports = router;

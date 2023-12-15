const express = require("express");
const router = express.Router();
const { getUser } = require("../controllers/userController");

router.get("/getUser", getUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const {
  getUser,
  getUserSocialMedia,
} = require("../controllers/userController");

router.get("/getUser", getUser);
router.get("/getUserSocialMedia", getUserSocialMedia);

module.exports = router;

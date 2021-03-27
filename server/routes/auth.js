const express = require("express");

const { login, profile, logout } = require("../controllers/auth");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/login", login);
router.get("/profile", protect, profile);
router.get("/logout", logout);

module.exports = router;

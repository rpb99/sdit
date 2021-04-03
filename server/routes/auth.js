const express = require("express");

const { register, login, currentUser, logout } = require("../controllers/auth");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", protect, currentUser);
router.get("/logout", logout);

module.exports = router;

const express = require("express");

const {
  register,
  login,
  currentUser,
  updateProfile,
  logout,
} = require("../controllers/users");
const protect = require("../middlewares/auth");
// const allow = require("../middlewares/permission");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current-user", protect, currentUser);
router.post("/logout", logout);
router.put("/profile", protect, updateProfile);

module.exports = router;

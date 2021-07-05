const express = require("express");

const {
  create,
  get,
  getAll,
  update,
  destroy,
  countAll
} = require("../controllers/sekolah-asal");
const protect = require("../middlewares/auth");
const allow = require("../middlewares/permission");

const router = express.Router();

router.post("/sekolah-asal", protect, allow("admin"), create);
router.get("/sekolah-asal", protect, allow("admin"), get);
router.put("/sekolah-asal/:id", protect, allow("admin"), update);

module.exports = router;
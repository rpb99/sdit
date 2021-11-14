const express = require("express");

const {
  create,
  getAll,
  destroy,
  update,
} = require("../controllers/spp-tahun-pelajaran");
const protect = require("../middlewares/auth");
const allow = require("../middlewares/permission");

const router = express.Router();

router.get("/spp-tahun-pelajaran", protect, allow("admin", "student"), getAll);
router.post("/spp-tahun-pelajaran", protect, allow("admin"), create);
router.put("/spp-tahun-pelajaran/:id", protect, allow("admin"), update);
router.delete("/spp-tahun-pelajaran/:id", protect, allow("admin"), destroy);

module.exports = router;

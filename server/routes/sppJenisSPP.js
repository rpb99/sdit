const express = require("express");

const {
  create,
  get,
  getAll,
  destroy,
  update,
} = require("../controllers/spp-jenis-spp");
const protect = require("../middlewares/auth");
const allow = require("../middlewares/permission");

const router = express.Router();

router.get("/spp-jenis-spp", protect, allow("admin"), getAll);
router.get("/spp-jenis-spp/:id", protect, allow("admin"), get);
router.post("/spp-jenis-spp", protect, allow("admin"), create);
router.put("/spp-jenis-spp/:id", protect, allow("admin"), update);
router.delete("/spp-jenis-spp/:id", protect, allow("admin"), destroy);

module.exports = router;

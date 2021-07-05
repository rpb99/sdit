const express = require("express");

const {
  create,
  get,
  getAll,
  update,
  destroy,
  countAll
} = require("../controllers/students");
const protect = require("../middlewares/auth");
const allow = require("../middlewares/permission");

const router = express.Router();

router.post("/students", protect, allow("admin"), create);
router.get("/students", protect, allow("admin"), getAll);
router.get('/students/count', protect, allow('admin'), countAll)
router.get("/students/:id", protect, allow("admin"), get);
router.put("/students/:id", protect, allow("admin"), update);
router.delete("/students/:id", protect, allow("admin"), destroy);

module.exports = router;
const { Student } = require("../../models");
const { Op } = require("sequelize");

module.exports = async (req, res) => {
  const { nis, nama } = req.query;
  let students;
  if (req.query !== {}) {
    students = await Student.findAll({
      where: {
        [Op.or]: [
          { nama: { [Op.like]: `%${nama || ""}%` } },
          { nis: { [Op.like]: `%${nis || ""}%` } },
        ],
      },
    });
  } else {
    students = await Student.findAll();
  }

  return res.json({ success: true, data: students });
};

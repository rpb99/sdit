const { Student, SekolahAsal } = require("../../models");

module.exports = async (req, res) => {
  const student = await Student.findByPk(req.params.id);


  if (!student)
    return res
      .status(404)
      .json({ success: false, message: "Student is not found" });

  return res.json({ success: true, data: student });
};

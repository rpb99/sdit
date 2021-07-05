const { Student } = require("../../models");

module.exports = async (req, res) => {
  const student = await Student.findByPk(req.params.id);

  if (!student)
    return res
      .status(404)
      .json({ success: false, message: "Student is not found" });

  await student.destroy();

  return res.json({
    success: true,
    message: `Student with a nis ${student.nis} deleted`,
  });
};

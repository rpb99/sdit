const { User } = require("../../models");

module.exports = async (req, res) => {
  try {
    const user = await User.findOne({
      attributes: ["first_name", "last_name", "email", "avatar", "role"],
      where: { id: req.user.id },
    });

    return res.json({ success: true, data: user });
  } catch (error) {
    console.log(error)
  }
};

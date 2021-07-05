module.exports = (...roles) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (!roles.includes(role))
      return res
        .status(405)
        .json({ success: false, message: "you don't have permission" });

    return next();
  };
};

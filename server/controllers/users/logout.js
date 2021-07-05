module.exports = (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(new Date().getTime() + 1),
    httpOnly: true,
  });
  res.clearCookie('token', { path: '/' });
  return res.json({ success: true, data: {} });
};

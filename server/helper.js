const sendTokenRes = (user, statusCode, res) => {
  const token = user.generateAccessToken();
  const options = {
    sameSite: "strict",
    path: "/",
    maxAge: process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
    // expires: new Date(
    //   Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    // ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") options.secure = true;

  return res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

module.exports = { sendTokenRes };

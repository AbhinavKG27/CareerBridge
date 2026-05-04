export const sendToken = (user, statusCode, res, message) => {
  const token = user.getJWTToken();

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(statusCode).json({
    success: true,
    user,
    message,
  });
};
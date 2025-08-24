import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncError.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }
  try {
    const decoded = jwt.verify(token, "mySuperSecretKey123");
    req.user = await User.findById(decoded.id);
    console.log(req.user);
    if (!req.user) {
      return next(new ErrorHandler("User Not Found", 404));
    }
    next();
  } catch (error) {
    return next(new ErrorHandler("Invalid Token", 401));
  }
});

import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";



export const register = async (req, res) => {
  const { name, email, phone, password, role } = req.body;

  // Check if all fields are provided
  if (!name || !email || !phone || !password || !role) {
    return res.status(400).json({
      success: false,
      message: "Please fill out the entire form!",
    });
  }

  // Check if the email is already registered
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return res.status(400).json({
      success: false,
      message: "Email is already registered!",
    });
  }

  try {
    // Create the new user
    const user = await User.create({
      name,
      email,
      phone,
      password,
      role,
    });

    // Send the token
    sendToken(user, 201, res, "User registered successfully!");
  } catch (error) {
    console.error("Error creating user: ", error); // Log the error for debugging
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email, password, and role.", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password.", 400));
  }
  if (user.role !== role) {
    return next(new ErrorHandler(`User with provided email and role ${role} not found!`, 404));
  }
  sendToken(user, 201, res, "User Logged In!");
});

export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});

export const getUser = catchAsyncErrors((req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

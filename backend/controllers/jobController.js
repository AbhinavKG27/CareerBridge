import mongoose from "mongoose";
import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Job } from "../models/jobSchema.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllJobs = catchAsyncErrors(async (req, res) => {
  const jobs = await Job.find({ expired: false });
  res.status(200).json({ success: true, jobs });
});

export const postJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Seeker not allowed to access this resource.", 403));
  }

  const { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo } = req.body;

  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please provide full job details.", 400));
  }

  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(new ErrorHandler("Please either provide fixed salary or ranged salary.", 400));
  }

  if (salaryFrom && salaryTo && fixedSalary) {
    return next(new ErrorHandler("Cannot enter fixed and ranged salary together.", 400));
  }

  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy: req.user._id,
  });

  res.status(201).json({ success: true, message: "Job Posted Successfully!", job });
});

export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role === "Job Seeker") {
    return next(new ErrorHandler("Job Seeker not allowed to access this resource.", 403));
  }

  const myJobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({ success: true, myJobs });
});

export const updateJob = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role === "Job Seeker") {
    return next(new ErrorHandler("Job Seeker not allowed to access this resource.", 403));
  }

  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Resource not found. Invalid _id", 400));
  }

  const job = await Job.findById(id);
  if (!job) return next(new ErrorHandler("OOPS! Job not found.", 404));

  if (job.postedBy.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("You can update only your own jobs.", 403));
  }

  await Job.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

  res.status(200).json({ success: true, message: "Job Updated!" });
});

export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  if (req.user.role === "Job Seeker") {
    return next(new ErrorHandler("Job Seeker not allowed to access this resource.", 403));
  }

  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Resource not found. Invalid _id", 400));
  }

  const job = await Job.findById(id);
  if (!job) return next(new ErrorHandler("OOPS! Job not found.", 404));

  if (job.postedBy.toString() !== req.user._id.toString()) {
    return next(new ErrorHandler("You can delete only your own jobs.", 403));
  }

  await job.deleteOne();
  res.status(200).json({ success: true, message: "Job Deleted!" });
});

export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Resource not found. Invalid _id", 400));
  }

  const job = await Job.findById(id);
  if (!job) return next(new ErrorHandler("Job not found.", 404));

  res.status(200).json({ success: true, job });
});

import { Application } from "../models/applicationSchema.js";
import { User } from "../models/userSchema.js";

// ✅ NEW FUNCTION
export const getPlatformStats = async (req, res) => {
  try {
    // total jobs
    const totalJobs = await Job.countDocuments();

    // unique companies (employers who posted jobs)
    const companies = await Job.distinct("postedBy");
    const totalCompanies = companies.length;

    // job seekers count
    const totalJobSeekers = await User.countDocuments({
      role: "Job Seeker",
    });

    // applications
    const totalApplications = await Application.countDocuments();

    const acceptedApplications = await Application.countDocuments({
      status: "Accepted",
    });

    // success rate
    const successRate =
      totalApplications === 0
        ? 0
        : Math.round(
            (acceptedApplications / totalApplications) * 100
          );

    res.status(200).json({
      success: true,
      stats: {
        totalJobs,
        totalCompanies,
        totalJobSeekers,
        successRate,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch stats",
    });
  }
};
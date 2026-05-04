import express from "express";
import {
  deleteJob,
  getAllJobs,
  getMyJobs,
  getSingleJob,
  postJob,
  updateJob,
} from "../controllers/jobController.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { getPlatformStats } from "../controllers/jobController.js";

const router = express.Router();

router.get("/stats", getPlatformStats);
router.get("/getall", getAllJobs);
router.get("/getmyjobs", isAuthenticated, getMyJobs);
router.post("/post", isAuthenticated, postJob);
router.put("/update/:id", isAuthenticated, updateJob);
router.delete("/delete/:id", isAuthenticated, deleteJob);
router.get("/:id", getSingleJob);

export default router;
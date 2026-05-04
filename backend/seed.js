import mongoose from "mongoose";
import { config } from "dotenv";
import { User } from "./models/userSchema.js";
import { Job } from "./models/jobSchema.js";

config();

await mongoose.connect(process.env.MONGO_URI);

// helpers
const randomItem = (arr) =>
  arr[Math.floor(Math.random() * arr.length)];

const randomPhone = () =>
  Math.floor(1000000000 + Math.random() * 9000000000).toString();

const names = [
  "Aman", "Ravi", "Neha", "Kiran", "Sneha",
  "Arjun", "Rahul", "Meena", "Vikram", "Anjali",
  "Karthik", "Pooja", "Nikhil", "Divya", "Aditya",
  "Sanjay", "Priya", "Rohit", "Kavya", "Manoj",
];

const companies = [
  "TechNova", "CodeCraft", "InnoSoft",
  "AI Labs", "NextGen Systems",
  "CloudCore", "DevSphere", "DataWorks",
];

const categories = [
  "Frontend Web Development",
  "MERN Stack Development",
  "Artificial Intelligence",
  "Mobile App Development",
  "Account & Finance",
  "Graphics & Design",
];

const cities = [
  "Bangalore", "Hyderabad", "Chennai",
  "Mumbai", "Delhi", "Pune",
];

const jobTitles = [
  "Frontend Developer",
  "Backend Engineer",
  "AI Engineer",
  "Full Stack Developer",
  "Mobile App Developer",
];

const run = async () => {
  console.log("⚠️ Clearing old data...");
  await User.deleteMany();
  await Job.deleteMany();

  const users = [];

  console.log("👤 Creating Users...");

  for (let i = 0; i < 25; i++) {
    const isEmployer = i < 10;

    const user = await User.create({
      name: isEmployer
        ? randomItem(companies)
        : randomItem(names),

      email: `user${i}@test.com`,

      password: "password123", // ✅ valid (>=8, <=32)

      phone: randomPhone(), // ✅ 10-digit string

      role: isEmployer ? "Employer" : "Job Seeker",
    });

    users.push(user);
  }

  const employers = users.filter(
    (u) => u.role === "Employer"
  );

  console.log("💼 Creating Jobs...");

  const jobs = [];

  for (let i = 0; i < 50; i++) {
    const employer = randomItem(employers);

    jobs.push({
      title: randomItem(jobTitles),

      category: randomItem(categories),

      country: "India",

      city: randomItem(cities),

      location: "Koramangala, Bangalore", // ✅ >10 chars

      description:
        "We are hiring talented developers to build scalable and modern applications.", // ✅ >20 chars

      postedBy: employer._id,
    });
  }

  await Job.insertMany(jobs);

  console.log("🔥 Seeding Completed!");
  console.log("Users:", users.length);
  console.log("Jobs:", jobs.length);

  console.log("\n🔐 TEST LOGIN:");
  console.log("Email: user1@test.com");
  console.log("Password: password123");

  process.exit();
};

run();
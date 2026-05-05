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

// 🔥 Companies
const maangCompanies = [
  "Google", "Amazon", "Apple", "Netflix", "Meta",
];

const serviceCompanies = [
  "TCS", "Infosys", "Cognizant", "Accenture", "Wipro",
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
  console.log("⚠️ NOT deleting old data (safe mode)");

  // ✅ Ensure at least some employers exist
  let employers = await User.find({ role: "Employer" });

  if (employers.length === 0) {
    console.log("⚠️ No employers found, creating some...");

    const users = [];

    for (let i = 0; i < 10; i++) {
      const user = await User.create({
        name: randomItem(maangCompanies.concat(serviceCompanies)),
        email: `employer${i}@test.com`,
        password: "password123",
        phone: randomPhone(),
        role: "Employer",
      });

      users.push(user);
    }

    employers = users;
  }

  console.log("💼 Adding Jobs (without deleting existing)...");

  const jobs = [];

  // 🔥 MAANG (20 jobs)
  for (let i = 0; i < 20; i++) {
    const employer = randomItem(employers);
    const company = randomItem(maangCompanies);

    jobs.push({
      title: randomItem(jobTitles),
      category: randomItem(categories),
      company,
      country: "India",
      city: randomItem(cities),
      location: "Koramangala, Bangalore",
      description:
        "We are hiring talented developers to build scalable and modern applications.",
      postedBy: employer._id,
    });
  }

  // 🔥 SERVICE (15 jobs)
  for (let i = 0; i < 15; i++) {
    const employer = randomItem(employers);
    const company = randomItem(serviceCompanies);

    jobs.push({
      title: randomItem(jobTitles),
      category: randomItem(categories),
      company,
      country: "India",
      city: randomItem(cities),
      location: "Electronic City, Bangalore",
      description:
        "Join our team to work on enterprise-level scalable systems.",
      postedBy: employer._id,
    });
  }

  await Job.insertMany(jobs);

  console.log("🔥 New Jobs Added!");
  console.log("Added Jobs:", jobs.length);

  process.exit();
};

run();
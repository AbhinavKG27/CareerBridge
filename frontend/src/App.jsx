// frontend/src/App.jsx
import { useContext } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Layout/Navbar";
import Footer from "./components/Layout/Footer";
import Home from "./components/Home/Home";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostJob from "./components/Job/PostJob";
import NotFound from "./components/NotFound/NotFound";
import MyJobs from "./components/Job/MyJobs";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { authReady, isAuthorized, user } = useContext(Context);

  if (!authReady) return null;
  if (!isAuthorized) return <Navigate to="/login" replace />;
  if (allowedRoles.length && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  const { authReady } = useContext(Context);

  if (!authReady) {
    return <div className="container">Loading session...</div>;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/job/getall" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetails />} />

        <Route
          path="/application/:id"
          element={
            <ProtectedRoute allowedRoles={["Job Seeker"]}>
              <Application />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications/me"
          element={
            <ProtectedRoute>
              <MyApplications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job/post"
          element={
            <ProtectedRoute allowedRoles={["Employer"]}>
              <PostJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job/me"
          element={
            <ProtectedRoute allowedRoles={["Employer"]}>
              <MyJobs />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
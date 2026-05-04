import { useContext } from "react";
import "./App.css";
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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

const App = () => {
  const { authReady, isAuthorized } = useContext(Context);

  // ⏳ Wait until auth check completes
  if (!authReady) {
    return (
      <div className="page">
        <div className="container">Loading session...</div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/job/getall" element={<Jobs />} />
        <Route path="/job/:id" element={<JobDetails />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/application/:id"
          element={isAuthorized ? <Application /> : <Login />}
        />
        <Route
          path="/applications/me"
          element={isAuthorized ? <MyApplications /> : <Login />}
        />
        <Route
          path="/job/post"
          element={isAuthorized ? <PostJob /> : <Login />}
        />
        <Route
          path="/job/me"
          element={isAuthorized ? <MyJobs /> : <Login />}
        />

        {/* FALLBACK */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
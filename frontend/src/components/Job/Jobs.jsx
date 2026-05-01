import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { Context } from "../../main";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isAuthorized } = useContext(Context);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get(`${API}/api/v1/job/getall`, { withCredentials: true });
        setJobs(res.data.jobs || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Unable to load jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, [API]);

  if (!isAuthorized) return <Navigate to="/login" />;

  return (
    <section className="jobs page">
      <div className="container">
        <h1>Explore Opportunities</h1>

        {loading && (
          <div className="banner">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card" aria-busy="true">Loading...</div>
            ))}
          </div>
        )}

        {!loading && error && <p>{error}</p>}

        {!loading && !error && jobs.length === 0 && <p>No jobs found right now. Please check back soon.</p>}

        {!loading && !error && jobs.length > 0 && (
          <div className="banner">
            {jobs.map((element) => (
              <div className="card" key={element._id}>
                <p>{element.title}</p>
                <p>{element.category}</p>
                <p>{element.city}, {element.country}</p>
                <Link to={`/job/${element._id}`}>Apply Now</Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Jobs;
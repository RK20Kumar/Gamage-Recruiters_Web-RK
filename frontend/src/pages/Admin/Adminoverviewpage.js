import React, { useState, useEffect } from "react";
import { FaClipboardList, FaBriefcase, FaTrashAlt } from "react-icons/fa";
import Navbar from "../../components/templates/AdminNavbar";
import Footer from "../../components/templates/Footer";
import Sidebar from "../../components/templates/ASidebar";
import "../../css/AdminOverviewPage.css";

const AdminDashboard = () => {
  const [postedJobs, setPostedJobs] = useState([]);
  const [totalApplications, setTotalApplications] = useState(0);

  useEffect(() => {
    // Fetch posted jobs
    fetch("http://localhost:7000/api/admin/postedjobs")
      .then((response) => response.json())
      .then((data) => setPostedJobs(data))
      .catch((err) => console.error("Error fetching posted jobs:", err));

    // Fetch total applications count
    fetch("http://localhost:7000/api/admin/applications/count")
      .then((response) => response.json())
      .then((data) => setTotalApplications(data.total))
      .catch((err) => console.error("Error fetching applications count:", err));
  }, []);

  const deleteJob = (jobId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this job?");
    
    if (confirmDelete) {
      fetch(`http://localhost:7000/api/admin/postedjobs/${jobId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete job");
          }
          return response.json();
        })
        .then(() => {
          // Remove the deleted job from the list
          setPostedJobs(postedJobs.filter((job) => job.job_id !== jobId));
        })
        .catch((err) => console.error("Error deleting job:", err));
    }
  };

  return (
    <div className="admin-overview-wrapper">
      <Navbar />
      <div className="admin-overview-content">
        <Sidebar />
        <div className="admin-overview-container">
          <h2>Hello, Welcome</h2>
          <p>Here Is Your Daily Activities And Applications</p>

          <div className="admin-stats">
            <div className="stat-box purple">
              <div className="stat-text">
                <h3>{postedJobs.length}</h3>
                <p>Posted Jobs</p>
              </div>
              <FaBriefcase className="stat-icon" />
            </div>
            <div className="stat-box orange">
              <div className="stat-text">
                <h3>{totalApplications}</h3>
                <p>New Applications</p>
              </div>
              <FaClipboardList className="stat-icon" />
            </div>
          </div>

          <div className="admin-table">
            <h3 className="table-title">Recently Posted Jobs</h3>
            <table>
              <thead>
                <tr>
                  <th>JOBS</th>
                  <th>STATE</th>
                  <th>Applications</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {postedJobs.map((job) => (
                  <tr key={job.job_id}>
                    <td>{job.job_title}</td>
                    <td>{job.state}</td>
                    <td>{totalApplications} Applications</td>
                    <td>
                      <button
                        className="view-btn"
                        onClick={() =>
                          (window.location.href = `/admin/applications/${job.job_id}`)
                        }
                      >
                        View Applications
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => deleteJob(job.job_id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;

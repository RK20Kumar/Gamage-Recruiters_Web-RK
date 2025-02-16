import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaDownload, FaArrowLeft } from "react-icons/fa"; 
import Navbar from "../../components/templates/AdminNavbar";
import Footer from "../../components/templates/Footer";
import Sidebar from "../../components/templates/ASidebar";
import "../../css/AdminOverviewPage.css";

const AdminApplications = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [jobTitle, setJobTitle] = useState("Loading...");

  useEffect(() => {
    fetch(`http://localhost:7000/api/admin/applications/${jobId}`)
      .then((response) => response.json())
      .then((data) => {
        setApplications(data);
        setJobTitle(data[0]?.job_title || "Job Title Not Available");
      })
      .catch((err) => console.error("Error fetching applications:", err));
  }, [jobId]);

  return (
    <div className="admin-overview-wrapper">
      <Navbar />
      <div className="admin-overview-content">
        <Sidebar />
        <div className="admin-overview-container">
          <div className="title-container">
            <FaArrowLeft className="back-icon" onClick={() => navigate("/admin-overview")} />
            <h2>{jobTitle}</h2>
          </div>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Experience</th>
                <th>Mobile number</th>
                <th>Email address</th>
                <th>CV/Resume</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id}>
                  <td>{app.name}</td>
                  <td>{app.experience_years}</td>
                  <td>{app.mobile_number}</td>
                  <td>{app.email}</td>
                  <td>
                    {app.cv_resume ? (
                      <a href={`http://localhost:7000/api/uploads/${app.cv_resume}`} download>
                        Download CV <FaDownload className="download-icon" />
                      </a>
                    ) : (
                      <span>No CV Uploaded</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminApplications;

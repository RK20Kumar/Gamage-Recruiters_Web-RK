const db = require("../utils/db");

// Add a new job post
exports.postJob = (req, res) => {
  const { title, state, salary, location, description } = req.body;

  if (!title || !state || !salary || !location || !description) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO postedjobs (job_title, state, salary, location, description) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [title, state, salary, location, description], (err, result) => {
    if (err) {
      console.error("Error posting job:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(201).json({ message: "Job posted successfully", jobId: result.insertId });
  });
};

// Get all posted jobs
exports.getPostedJobs = (req, res) => {
  const sql = "SELECT * FROM postedjobs ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching posted jobs:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json(results);
  });
};

// Get total applications count
exports.getApplicationsCount = (req, res) => {
  const sql = "SELECT COUNT(*) AS total FROM applyjob";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching application count:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json(results[0]);
  });
};

// Get applications for a specific job
exports.getApplicationsByJobId = (req, res) => {
  const jobId = req.params.jobId;
  const query = "SELECT * FROM applyjob WHERE job_id = ?";
  db.query(query, [jobId], (err, results) => {
    if (err) {
      console.error("Error fetching applications:", err);
      return res.status(500).json({ message: "Database query error" });
    }
    res.status(200).json(results);
  });
}  

// Delete a job post
exports.deleteJob = (req, res) => {
  const { jobId } = req.params;

  const sql = "DELETE FROM postedjobs WHERE id = ?";
  db.query(sql, [jobId], (err, result) => {
    if (err) {
      console.error("Error deleting job:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.status(200).json({ message: "Job deleted successfully" });
  });
};

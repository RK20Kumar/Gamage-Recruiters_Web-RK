const db = require("../utils/db");

// Get the list of posted jobs
exports.getPostedJobs = (req, res) => {
  const query = "SELECT * FROM postedjobs ORDER BY posted_at DESC LIMIT 10";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching posted jobs:", err);
      return res.status(500).send("Server error");
    }
    res.json(results);
  });
};

// Get the list of applications for a specific job
exports.getApplications = (req, res) => {
  const jobId = req.params.jobId;
  const query = `
    SELECT applyjob.*, postedjobs.job_title
    FROM applyjob
    JOIN postedjobs ON postedjobs.id = applyjob.id
    WHERE postedjobs.id = ?
    ORDER BY applyjob.applied_at DESC
  `;

  db.query(query, [jobId], (err, results) => {
    if (err) {
      console.error("Error fetching applications:", err);
      return res.status(500).send("Server error");
    }
    res.json(results);
  });
};

// Delete a job post
exports.deleteJob = (req, res) => {
  const jobId = req.params.jobId;
  const query = "DELETE FROM postedjobs WHERE id = ?";

  db.query(query, [jobId], (err, result) => {
    if (err) {
      console.error("Error deleting job:", err);
      return res.status(500).send("Server error");
    }
    res.send("Job deleted successfully");
  });
};

// Get the total number of applications
exports.getApplicationCount = (req, res) => {
  const query = "SELECT COUNT(*) AS total FROM applyjob";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching applications count:", err);
      return res.status(500).send("Server error");
    }
    res.json(results[0]);
  });
};

exports.applyForJob = (req, res) => {
  const { name, email, mobile_number, experience_years, cv_resume, job_id } = req.body;

  if (!job_id) {
    return res.status(400).json({ error: "Job ID is required" });
  }

  // Assuming we need to store the job_id from the request
  const query = `
    INSERT INTO applyjob (name, email, mobile_number, experience_years, cv_resume)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [name, email, mobile_number, experience_years, cv_resume], (err, result) => {
    if (err) {
      console.error("Error applying for job:", err);
      return res.status(500).send("Server error");
    }

    // If job_id needs to be handled separately in another table or step, that can be managed as well.
    // Return success message
    res.send("Application submitted successfully");
  });
};




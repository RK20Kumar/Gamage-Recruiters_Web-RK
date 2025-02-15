const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminControllers");

// Route to get posted jobs
router.get("/postedjobs", AdminController.getPostedJobs);

// Route to get applications for a specific job
router.get("/applications/:jobId", AdminController.getApplications);

// Route to count total applications
router.get("/applications/count", AdminController.getApplicationCount);

// Route to delete a job post
router.delete("/postedjobs/:jobId", AdminController.deleteJob);

module.exports = router;

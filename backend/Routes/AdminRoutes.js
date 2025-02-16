const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminControllers");

// Admin job posting routes without the /admin prefix
router.post("/jobs", AdminController.postJob);
router.get("/postedjobs", AdminController.getPostedJobs);
router.get("/applications/count", AdminController.getApplicationsCount);
router.get("/applications/:jobId", AdminController.getApplicationsByJobId);
router.delete("/postedjobs/:jobId", AdminController.deleteJob);

module.exports = router;

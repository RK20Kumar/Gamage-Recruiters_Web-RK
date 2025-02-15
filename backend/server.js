const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const adminRoutes = require("./Routes/AdminRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7000;

// Middleware
app.use(cors());
app.use(express.json());

// Use the admin routes
app.use("/admin", adminRoutes);

// Test Route
app.get("/", (req, res) => {
    res.send("Backend is running!");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

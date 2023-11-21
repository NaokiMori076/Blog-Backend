const express = require("express");
const Router = express.Router();

// Authentication Routes

// Role Routes
const blogRoutes = require("./blogRoutes");
// Use
Router.use("/blog", blogRoutes);

module.exports = Router;

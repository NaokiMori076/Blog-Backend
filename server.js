const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const path = require("path");
const routes = require("./app/routes");

app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api", routes);

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

connectDB()
  .then((res) => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

async function connectDB() {
  await mongoose.connect("mongodb://127.0.0.1:27017/blog");
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to blog application." });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

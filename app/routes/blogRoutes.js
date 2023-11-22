const express = require("express");

const BlogController = require("../controllers/blogController");
const multer = require("multer");

const storage = multer.diskStorage({
  // destination: (req, file, cb) => {
  //   cb(null, "uploads/blog/"); // Specify the destination folder for uploaded files
  // },
  filename: (req, file, cb) => {
    cb(
      null,
      `blog_${Date.now()}_${Math.round(Math.random() * 1e9)}_${
        file.originalname
      }`
    );
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

// Fake data
router.get("/list", BlogController.LoadArticleLists);
router.get("/list/:id", BlogController.getArticle);
router.post("/create", upload.single("image"), BlogController.createArticle);
router.delete("/delete/:id", BlogController.deleteArticle);
router.post(
  "/update/:id",
  upload.single("image"),
  BlogController.updateArticle
);

module.exports = router;

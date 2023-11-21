const multer = require("multer");
const path = require("node:path");
const fs = require("node:fs");

const _DIR = {
  image: "uploads/blog/",
  expense: "uploads/expense/",
  category: "uploads/category/",
};

// Set up storage for uploaded profile images
const avatarStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, _DIR.avatar);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `profile_image_${Date.now()}_${Math.round(Math.random() * 1e9)}_${
        file.originalname
      }`
    );
  },
});

// Create the multer instance for profile image file upload
const avatarUploader = multer({
  storage: avatarStorage,
  fileFilter: function (req, file, cb) {
    // Set the filetypes, it is optional
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    const BASE_DIR_PATH = path.join(path.resolve("./"), _DIR.avatar);

    if (mimetype && extname) {
      if (!fs.existsSync(BASE_DIR_PATH)) {
        fs.mkdir(BASE_DIR_PATH, { recursive: true }, (err) => {
          if (err) {
            return cb("Directory cannot be created now!");
          }
          return cb(null, true);
        });
      } else {
        return cb(null, true);
      }
    } else {
      cb(
        "Error: File upload only supports the " +
          "following filetypes - " +
          filetypes
      );
    }
  },
}).single("avatar");

// Set up storage for uploaded bank expense files
const expenseStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `${_DIR.expense}/${req.currentUser._id}`);
  },
  filename: (req, file, cb) => {
    cb(null, `expense_${Date.now()}_${file.originalname}`);
  },
});

// Create the multer instance for Bank Expense file upload
const expenseUploader = multer({
  storage: expenseStorage,
  fileFilter: function (req, file, cb) {
    // Set the filetypes, it is optional
    var filetypes = /xlsx|xls|csv|excel|sheet/;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    // App path/uploads/expense/user_id
    const BASE_DIR_PATH = path.join(
      path.resolve("./"),
      `${_DIR.expense}/${req.currentUser._id}`
    );

    if (mimetype && extname) {
      if (!fs.existsSync(BASE_DIR_PATH)) {
        fs.mkdir(BASE_DIR_PATH, { recursive: true }, (err) => {
          if (err) {
            return cb("Directory cannot be created now!");
          }
          return cb(null, true);
        });
      } else {
        return cb(null, true);
      }
    } else {
      cb(
        file.mimetype +
          "Error: File upload only supports the " +
          "following filetypes - " +
          filetypes
      );
    }
  },
}).single("expense");

// Set up storage for uploaded profile images
const categoryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, _DIR.category);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `category_brand_${Date.now()}_${Math.round(Math.random() * 1e9)}_${
        file.originalname
      }`
    );
  },
});

// Create the multer instance for expense category image file upload
const categoryUploader = multer({
  storage: categoryStorage,
  fileFilter: function (req, file, cb) {
    // Set the filetypes, it is optional
    var filetypes = /jpeg|jpg|png/;
    var mimetype = filetypes.test(file.mimetype);

    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    const BASE_DIR_PATH = path.join(path.resolve("./"), _DIR.category);

    if (mimetype && extname) {
      if (!fs.existsSync(BASE_DIR_PATH)) {
        fs.mkdir(BASE_DIR_PATH, { recursive: true }, (err) => {
          if (err) {
            return cb("Directory cannot be created now!");
          }
          return cb(null, true);
        });
      } else {
        return cb(null, true);
      }
    } else {
      cb(
        "Error: File upload only supports the " +
          "following filetypes - " +
          filetypes
      );
    }
  },
}).single("category_photo");

// Remove files
const removeFile = (_file) => {
  return new Promise((resolve, reject) => {
    if (_file.includes("public/assets")) return resolve(true);

    fs.unlink(_file, (err) => {
      if (err) return reject(err);
      resolve(`Deleted ${_file}`);
    });
  });
};

module.exports = {
  avatarUploader,
  expenseUploader,
  categoryUploader,
  removeFile,
};

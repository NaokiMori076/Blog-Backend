const Blog = require("../models/blog.model");
const { response, fileManager } = require("../utils");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const LoadArticleLists = async (req, res) => {
  try {
    const articles = (await Blog.find({}).exec()) ?? [];
    return response(res, { articles }, {}, 200);
  } catch (error) {
    return response(res, {}, error, 500, "Something went wrong!");
  }
};

const createArticle = async (req, res) => {
  try {
    cloudinary.uploader.upload(req.file.path, async function (result) {
      req.body.file = result.secure_url;
      let params = { ...req.body };

      const article = await Blog.findOne({
        $and: [
          { title: params.title },
          { firstname: params.firstname, lastname: params.lastname },
        ],
      });
      if (article !== null) {
        return response(res, {}, {}, 500, "It is already posted article.");
      } else {
        const newArticle = new Blog({
          title: params.title,
          subTitle: params.subTitle,
          content: params.content,
          firstname: params.firstname,
          lastname: params.lastname,
          image: params.file,
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        newArticle
          .save()
          .then((item) => {
            return response(res, {}, {}, 200, "Success");
          })
          .catch((error) => {
            return response(
              res,
              {},
              { error },
              500,
              "unable to save to database"
            );
          });
      }
    });
  } catch (error) {
    return response(res, {}, error, 500, "Something went wrong!");
  }
};

const deleteArticle = async (req, res) => {
  const params = req.params;
  try {
    const article = await Blog.findById(params.id);
    if (article !== null) {
      await Blog.deleteOne({ _id: params.id });
      return response(res, {}, {}, 200, "Success");
    } else {
      return response(res, {}, {}, 500, "It is not exist");
    }
  } catch (error) {
    return response(res, {}, error, 500, "Something went wrong!");
  }
};

const getArticle = async (req, res) => {
  const params = req.params;
  try {
    const article = await Blog.findById(params.id);
    if (article !== null) {
      return response(res, article, {}, 200, "Success");
    } else {
      return response(res, {}, {}, 500, "It is not exist");
    }
  } catch (error) {
    return response(res, {}, error, 500, "Something went wrong!");
  }
};

const updateArticle = async (req, res) => {
  const params = { ...req.body };
  const id = req.params.id;
  try {
    const article = await Blog.findById(id);
    if (article !== null) {
      await Blog.updateOne({ _id: id }, { $set: { ...params } });
      return response(res, {}, {}, 200, "Success");
    } else {
      return response(res, {}, {}, 500, "It is not exist");
    }
  } catch (error) {
    return response(res, {}, error, 500, "Something went wrong!");
  }
};

const BlogController = {
  LoadArticleLists,
  createArticle,
  deleteArticle,
  getArticle,
  updateArticle,
};

module.exports = BlogController;

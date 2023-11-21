const Blog = require("../models/blog.model");
const { response, fileManager } = require("../utils");

const LoadArticleLists = async (req, res) => {
  const params = req.query;
  try {
    const articles = (await Blog.find({}).exec()) ?? [];
    return response(res, { articles }, {}, 200);
  } catch (error) {
    return response(res, {}, error, 500, "Something went wrong!");
  }
};

const createArticle = async (req, res) => {
  try {
    let params = { ...req.body };
    const file = req.file;

    const article = await Blog.findOne({
      $and: [{ title: params.title }, { username: params.username }],
    });
    if (article !== null) {
      return response(res, {}, {}, 500, "It is already posted article.");
    } else {
      const newArticle = new Blog({
        title: params.title,
        subTitle: params.subTitle,
        content: params.content,
        username: params.username,
        image: file.filename,
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
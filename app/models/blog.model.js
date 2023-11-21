const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    title: String,
    subTitle: String,
    username: String,
    content: String,
    image: String,
    createdAt: Date,
    updatedAt: Date,
  },
  { timestamps: true }
);

schema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const Blog = model("blog", schema);

module.exports = Blog;

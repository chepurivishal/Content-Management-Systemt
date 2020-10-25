var mongoose = require("mongoose");

var schema = mongoose.Schema;

var blogSchema = new schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subTitle: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
    required: true,
    default: Date.now,
  },
  media: {
    type: String,
  },
  comments: {
    type: Array,
    default: [],
  },
  likes: {
    type: Array,
    default: [],
  },
});

var blog = mongoose.model("Blog", blogSchema);

module.exports = blog;

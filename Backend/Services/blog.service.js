var app = require("../app");
var BaseService = require("./baseservice");
var _ = require("lodash");
var Promise = require("bluebird");

class BlogService extends BaseService {
  constructor() {
    super();
  }

  addBlog(body) {
    var blogModel = require("../Models/blog.model").getInst();
    if (body) {
      return blogModel.createBlog(body);
    }
  }

  getBlogs(opts) {
    var blogModel = require("../Models/blog.model").getInst();
    if (opts) {
      return blogModel.getBlogs(opts).then(function (blogs) {
        return Promise.map(blogs, function (blog) {
          var userModel = require("../Models/user.model").getInst();
          blog = blog.toObject(blog);
          console.log("USERID!!!!!!!!!!       ", blog.userId);
          return userModel
            .getUser({ _id: blog.userId })
            .then(function (userInfo) {
              if (userInfo) {
                blog.userName = userInfo.userName;
                blog.firstName = userInfo.firstName;
                blog.lastName = userInfo.lastName;
              }
              return Promise.resolve(blog);
            });
        });
      });
    }
  }

  getBlog(id) {
    var blogModel = require("../Models/blog.model").getInst();
    if (id) {
      return blogModel.getBlog(id);
    }
  }

  deleteBlog(id) {
    var blogModel = require("../Models/blog.model").getInst();
    if (id) {
      return blogModel.deleteBlog(id);
    }
  }

  updateBlog(body, blogId) {
    var blogModel = require("../Models/blog.model").getInst();
    if (body) {
      return blogModel.updateBlog(body, blogId);
    }
  }
}
module.exports = {
  getInst: () => {
    return new BlogService();
  },
};

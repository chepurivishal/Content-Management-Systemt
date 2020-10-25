var Promise = require("bluebird");
var BaseModel = require("./BaseModel.js");

class BlogModel extends BaseModel {
  constructor() {
    super();
  }
  createBlog(body) {
    var data = {};
    if (body) {
      if (body.userId) {
        data.userId = body.userId;
      }
      if (body.title) {
        data.title = body.title;
      }
      if (body.subTitle) {
        data.subTitle = body.subTitle;
      }
      if (body.description) {
        data.description = body.description;
      }
      if (body.comments) {
        data.comments = body.comments;
      }
      if (body.likes) {
        data.likes = body.likes;
      }
    }
    var model = require("../Databases/blog.db");
    var newBlog = model(body);
    console.log("#$%^&*(#$%^&*(#$%^&*(", body);
    return Promise.resolve(newBlog.save());
  }

  getBlogs(opts) {
    var model = require("../Databases/blog.db");
    var query = {};
    if (opts) {
      if (opts._id) {
        query._id = opts._id;
      }
      if (opts.userId) {
        query.userId = opts.userId;
      }
      if (opts.title) {
        query.title = opts.title;
      }
      if (opts.subTitle) {
        query.subTitle = opts.subTitle;
      }
      if (opts.description) {
        query.description = opts.description;
      }
      if (opts.comments) {
        query.comments = opts.comments;
      }
      if (opts.likes) {
        query.likes = opts.likes;
      }
    }
    return Promise.resolve(model.find(query, {}, { sort: { time: -1 } }));
  }

  getBlog(id) {
    var model = require("../Databases/blog.db");
    var query = {};
    if (id) {
      query._id = id;
    }
    return Promise.resolve(model.findOne(query)).then(function (data) {
      if (data) return data.toObject(data);
      else return Promise.reject();
    });
  }

  updateBlog(body, blogId) {
    var model = require("../Databases/blog.db");
    var query = {};
    var data = {};
    if (blogId) {
      query._id = blogId;
    }
    if (body) {
      if (body.userId) {
        data.userId = body.userId;
      }
      if (body.title) {
        data.title = body.title;
      }
      if (body.subTitle) {
        data.subTitle = body.subTitle;
      }
      if (body.description) {
        data.description = body.description;
      }
      if (body.comments) {
        data.comments = body.comments;
      }
      if (body.likes) {
        data.likes = body.likes;
      }
    }
    return Promise.resolve(model.findOneAndUpdate(query, data));
  }

  deleteBlog(id) {
    var model = require("../Databases/blog.db");
    var query = {};
    if (id) {
      query._id = id;
    }
    return Promise.resolve(model.findByIdAndRemove(query));
  }
}
module.exports = {
  getInst: () => {
    return new BlogModel();
  },
};

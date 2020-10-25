var Promise = require("bluebird");
var codes = require("../codes.json");

module.exports = function (app) {
  var bodyparser = require("body-parser");
  app.use(bodyparser.json());
  app.use(bodyparser.urlencoded({ extended: true }));

  app.post("/blog/api/user/:userId/content", (req, res) => {
    var serviceInst = require("../Services/blog.service").getInst();
    if (!res) {
      res.status("400");
      res.send(codes["INV_DETAILS"]);
    }
    if (!req.body) {
      res.status("400");
      res.send(codes["MISSING_BODY"]);
    }
    return serviceInst
      .addBlog(req.body)
      .then(function (data) {
        if (!data) {
          res.status("400");
          res.send(codes["ERR_IN_FETCH"]);
        }
        res.send(data);
      })
      .catch((err) => {
        console.log(
          " ==================    ERROR   ================== ",
          JSON.stringify(err)
        );
        res.status("500");
        res.send({
          Error: codes["INTERNAL_SERVER_ERR"],
        });
      });
  });

  app.get("/blog/api/user/:userId/content", (req, res) => {
    var serviceInst = require("../Services/blog.service").getInst();
    if (!res) {
      res.status("400");
      res.send(codes["INV_DETAILS"]);
    }
    return serviceInst.getBlogs(req.query).then(function (data) {
      if (!data) {
        res.status("400");
        res.send(codes["ERR_IN_FETCH"]);
      }
      res.send(data);
    });
    // .catch((err) => {
    //   console.log(
    //     " ==================    ERROR   ================== ",
    //     JSON.stringify(err)
    //   );
    //   res.status("500");
    //   res.send({
    //     Error: codes["INTERNAL_SERVER_ERR"],
    //   });
    // });
  });

  app.get("/blog/api/user/:userId/content/:id", (req, res) => {
    var serviceInst = require("../Services/blog.service").getInst();
    if (!res) {
      res.status("400");
      res.send(codes["INV_DETAILS"]);
    }
    return serviceInst
      .getBlog(req.params.id)
      .then(function (data) {
        if (!data) {
          res.status("400");
          res.send(codes["ERR_IN_FETCH"]);
        }
        res.send(data);
      })
      .catch((err) => {
        console.log(
          " ==================    ERROR   ================== ",
          JSON.stringify(err)
        );
        res.status("500");
        res.send({
          Error: codes["INTERNAL_SERVER_ERR"],
        });
      });
  });

  app.put("/blog/api/user/:userId/content/:id", (req, res) => {
    var serviceInst = require("../Services/blog.service").getInst();
    var blogId;
    if (!res) {
      res.status("400");
      res.send(codes["INV_DETAILS"]);
    }
    if (!req.body) {
      res.status("400");
      res.send(codes["MISSING_BODY"]);
    }
    if (req.params) {
      blogId = req.params.id;
    }
    return serviceInst
      .updateBlog(req.body, blogId)
      .then(function (data) {
        if (!data) {
          res.status("400");
          res.send(codes["ERR_IN_FETCH"]);
        }
        res.send(data);
      })
      .catch((err) => {
        console.log(
          " ==================    ERROR   ================== ",
          JSON.stringify(err)
        );
        res.status("500");
        res.send({
          Error: codes["INTERNAL_SERVER_ERR"],
        });
      });
  });

  app.delete("/blog/api/user/:userId/content/:id", (req, res) => {
    var serviceInst = require("../Services/blog.service").getInst();
    if (!res) {
      res.status("400");
      res.send(codes["INV_DETAILS"]);
    }

    return serviceInst
      .deleteBlog(req.params.id)
      .then(function (data) {
        if (!data) {
          res.status("400");
          res.send(codes["ERR_IN_FETCH"]);
        }
        res.send(data);
      })
      .catch((err) => {
        console.log(
          " ==================    ERROR   ================== ",
          JSON.stringify(err)
        );
        res.status("500");
        res.send({
          Error: codes["INTERNAL_SERVER_ERR"],
        });
      });
  });
};

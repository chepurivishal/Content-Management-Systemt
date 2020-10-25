import React, { useEffect, useState } from "react";
import {
  Jumbotron,
  Button,
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  CardHeader,
  CardFooter,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import BlogCard from "../Templates/BlogCard";
import AddBlog from "../Templates/addBlog";
const config = require("../config/config.json");
const urlConfig = require("../config/urlsconfig.json");

const Home = () => {
  let [blogs, setBlogs] = useState([]);
  const history = useHistory();

  const fetchBlog = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    let url = `${config.baseURL}${urlConfig.getblogs.uri}`;
    url = url.replace(":userId", userId);
    fetch(url, {
      method: urlConfig.getblogs.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((response) => {
        if (response) {
          setBlogs(response);
        }
      });
  };
  useEffect(() => {
    fetchBlog();
  }, []);
  return (
    <React.Fragment>
      <br />
      <br />
      <br />
      <br />
      <Row>
        <Col xs="1"></Col>
        <Col xs="7">
          <div style={{ "overflow-y": "scroll", height: "500px" }}>
            {blogs.map((blog) => {
              return (
                <React.Fragment>
                  <BlogCard
                    title={blog.title}
                    subtitle={blog.subTitle}
                    description={blog.description}
                    media={blog.media}
                    likes={blog.likes}
                    _id={blog._id}
                    userName={blog.userName}
                    userId={blog.userId}
                    time={blog.time}
                    comments={blog.comments}
                  />
                  <br />
                </React.Fragment>
              );
            })}
          </div>
        </Col>
        <Col xs="3">
          <Card>
            <CardBody>
              <hr />
              <CardText>
                <p className="lead-small">
                  A blog is an online journal or informational website
                  displaying information in the reverse chronological order,
                  with the latest posts appearing first, at the top. It is a
                  platform where a writer or a group of writers share their
                  views on an individual subject. So Create a New Blog and share
                  your Ideas and Thoughts :D !!
                </p>
              </CardText>
              <hr />
              <CardFooter>
                <Button
                  size="sm"
                  color="info"
                  block
                  onClick={() => {
                    history.push("/addblog");
                  }}
                >
                  New Blog
                </Button>
              </CardFooter>
            </CardBody>
          </Card>
        </Col>
        <Col xs="1"></Col>
      </Row>
    </React.Fragment>
  );
};

export default Home;

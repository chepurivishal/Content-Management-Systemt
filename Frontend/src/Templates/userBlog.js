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
import config from "../config/config.json";
import urlConfig from "../config/urlsconfig.json";
import BlogCard from "./BlogCard";

const UserBlog = ({ match }) => {
  let [userBlogs, setUserBlogs] = useState([]);
  const history = useHistory();
  const userId = localStorage.getItem("userId");
  const requestedUserId = match.params.id;

  const objToQueryString = (obj) => {
    const keyValuePairs = [];
    for (const key in obj) {
      keyValuePairs.push(
        encodeURIComponent(key) + "=" + encodeURIComponent(obj[key])
      );
    }
    return keyValuePairs.join("&");
  };

  const fetchUserBlog = () => {
    const token = localStorage.getItem("token");
    let url = `${config.baseURL}${urlConfig.getblogs.uri}`;
    url = url.replace(":userId", userId);
    let queryParams = {
      userId: requestedUserId,
    };
    url = `${url}?${objToQueryString(queryParams)}`;
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
          setUserBlogs(response);
        }
      });
  };

  useEffect(() => {
    fetchUserBlog();
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
            {userBlogs.map((userBlog) => {
              return (
                <React.Fragment>
                  <BlogCard
                    title={userBlog.title}
                    subtitle={userBlog.subTitle}
                    description={userBlog.description}
                    media={userBlog.media}
                    likes={userBlog.likes}
                    _id={userBlog._id}
                    userId={userBlog.userId}
                    time={userBlog.time}
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

export default UserBlog;

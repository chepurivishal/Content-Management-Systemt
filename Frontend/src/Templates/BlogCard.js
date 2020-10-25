import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardSubtitle,
  CardText,
  CardTitle,
  Button,
  Row,
  NavLink,
  ButtonGroup,
  Input,
} from "reactstrap";
import urlConfig from "../config/urlsconfig.json";
import config from "../config/config.json";
import { Link, useHistory } from "react-router-dom";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
const _ = require("lodash");
const moment = require("moment");

const BlogCard = (props) => {
  const history = useHistory();
  const userId = localStorage.getItem("userId");
  const requetsedUserId = props.userId;
  let [blogs, updateBlogs] = useState([]);
  let [isLiked, setIsLiked] = useState(
    props.likes.includes(userId) ? true : false
  );
  let [_likes, setLikes] = useState(props.likes);

  const token = localStorage.getItem("token");
  const handleLike = (blogId, likes) => {
    if (!isLiked) {
      var temp = _.clone(_likes);
      temp.push(userId);
      setLikes((_likes = temp));
    } else {
      var temp = _.clone(_likes);
      _.remove(temp, (id) => {
        return id === userId;
      });
      setLikes((_likes = temp));
    }
    setIsLiked((isLiked = !isLiked));
    let body = JSON.stringify({
      likes: _likes,
    });

    let url = `${config.baseURL}${urlConfig.editblog.uri}`;
    url = url.replace(":id", props._id);
    url = url.replace(":userId", userId);
    fetch(url, {
      method: urlConfig.editblog.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: body,
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
    });
  };
  const deleteBlog = (id) => {
    let url = `${config.baseURL}${urlConfig.deleteblog.uri}`;
    url = url.replace(":id", id);
    url = url.replace(":userId", userId);
    fetch(url, {
      method: urlConfig.deleteblog.method,
      headers: {
        "Context-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((response) => {
        let _blogs = _.clone(blogs);
        _.remove(_blogs, (blog) => {
          if (blog._id === id) return true;
        });
        updateBlogs((blogs = _blogs));
        window.location.reload(false);
      });
  };
  return (
    <div>
      <React.Fragment>
        <Card>
          <CardBody>
            <CardText>
              {props.userName ? (
                <React.Fragment>
                  <p>
                    Posted by{" "}
                    <Link
                      onClick={() => history.push(`/userblog/${props.userId}`)}
                    >
                      {props.userName}
                    </Link>
                    {`  ${moment(props.time).fromNow()}`}
                  </p>
                </React.Fragment>
              ) : (
                <div />
              )}
            </CardText>
            <CardImg width="400px" height="500px" src={props.media} />
            <CardTitle>
              <h5 className="display-7">{props.title}</h5>
            </CardTitle>
            <CardSubtitle>
              <h6 className="display-8">{props.subtitle}</h6>
            </CardSubtitle>
            <hr />
            <CardText>
              <p className="lead-small">{props.description}</p>
            </CardText>
            <hr />
            <h4>
              {" "}
              {isLiked ? (
                <AiFillLike
                  onClick={() => handleLike(props._id, props.likes)}
                />
              ) : (
                <AiOutlineLike
                  onClick={() => handleLike(props._id, props.likes)}
                />
              )}
              {"   "}
              <span className="lead-small">Liked By {_likes.length}</span>
            </h4>
            <h4>
              {userId === requetsedUserId ? (
                <React.Fragment>
                  <AiOutlineEdit
                    onClick={() => history.push(`/editblog/${props._id}`)}
                  />
                  <AiOutlineDelete onClick={() => deleteBlog(props._id)} />
                </React.Fragment>
              ) : (
                <React.Fragment />
              )}
            </h4>
            <p></p>
          </CardBody>
        </Card>
      </React.Fragment>
    </div>
  );
};

export default BlogCard;

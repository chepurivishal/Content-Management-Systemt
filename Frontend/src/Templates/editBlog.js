import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row,
} from "reactstrap";
import { useHistory } from "react-router-dom";

import urlConfig from "../config/urlsconfig.json";
import config from "../config/config.json";

const EditBlog = ({ match }) => {
  let [blog, setBlog] = useState([]);
  let [title, setTitle] = useState("");
  let [subTitle, setSubtitle] = useState("");
  let [description, setDescription] = useState("");
  let [image, setImage] = useState("");

  const history = useHistory();

  const changeTitle = (e) => {
    setTitle((title = e.target.value));
  };
  const changeSubTitle = (e) => {
    setSubtitle((subTitle = e.target.value));
  };
  const changeDescription = (e) => {
    setDescription((description = e.target.value));
  };
  const changeUrl = (e) => {
    setImage((image = e.target.value));
  };

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const onSubmit = (id) => {
    let body = JSON.stringify({
      userId: userId,
      title: title,
      subTitle: subTitle,
      description: description,
      media: image,
    });

    let url = `${config.baseURL}${urlConfig.editblog.uri}`;
    url = url.replace(":userId", userId);
    url = url.replace(":id", id);
    fetch(url, {
      method: urlConfig.editblog.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${token}`,
      },
      body: body,
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        }
      })
      .then((response) => {
        history.push("/");
      });
  };
  const fetchBlog = (id) => {
    let url = `${config.baseURL}${urlConfig.getblog.uri}`;
    url = url.replace(":id", id);
    url = url.replace(":userId", userId);
    fetch(url, {
      method: urlConfig.getblog.method,
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
          setTitle(response.title);
          setSubtitle(response.subTitle);
          setDescription(response.description);
          setImage(response.media);
        }
      });
  };

  useEffect(() => {
    fetchBlog(match.params.id);
  }, []);

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <Row>
        <Col xs="1"></Col>
        <Col xs="10">
          <Card>
            <CardBody>
              <Form>
                <FormGroup>
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>TITLE</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      size="sm"
                      type="text"
                      name="title"
                      id="title"
                      value={title}
                      onChange={changeTitle}
                      autoComplete="off"
                    />
                  </InputGroup>
                  <br />
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>SUB-TITLE</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      size="sm"
                      type="subtitle"
                      name="subtitle"
                      id="subtitle"
                      value={subTitle}
                      onChange={changeSubTitle}
                    />
                  </InputGroup>
                  <br />
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>MEDIA URL</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      size="sm"
                      type="text"
                      name="url"
                      id="url"
                      value={image}
                      onChange={changeUrl}
                    />
                  </InputGroup>
                  <br />
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>DESCRIPTION</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                  <Input
                    size="sm"
                    type="textarea"
                    name="description"
                    id="description"
                    value={description}
                    onChange={changeDescription}
                  />

                  <br />
                  <Button
                    color="info"
                    size="sm"
                    onClick={() => onSubmit(match.params.id)}
                  >
                    SUBMIT
                  </Button>
                </FormGroup>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col xs="1"></Col>
      </Row>
    </div>
  );
};
export default EditBlog;

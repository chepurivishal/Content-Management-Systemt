import React, { useState } from "react";
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

const AddBlog = () => {
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
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", userId);
  const onSubmit = () => {
    let body = JSON.stringify({
      userId: userId,
      title: title,
      subTitle: subTitle,
      description: description,
      media: image,
    });
    const token = localStorage.getItem("token");

    let url = `${config.baseURL}${urlConfig.addblog.uri}`;
    console.log("useriDDDDDDDDDDDDDDDDDddd", userId);
    url = url.replace(":userId", userId);
    fetch(url, {
      method: urlConfig.addblog.method,
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
                    onChange={changeDescription}
                  />

                  <br />
                  <Button color="info" size="sm" onClick={onSubmit}>
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
export default AddBlog;

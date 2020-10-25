import React, { useContext, useState } from "react";
import LoginContext from "../context/loginContext";
import { Link, useHistory } from "react-router-dom";
import {
  Card,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  NavLink,
  Col,
  InputGroupAddon,
  InputGroup,
  InputGroupText,
  Alert,
} from "reactstrap";

const urlconfig = require("../config/urlsconfig.json");
const config = require("../config/config.json");

const Login = (props) => {
  const history = useHistory();
  const { isLoggedIn, toggleLogIn } = useContext(LoginContext);
  let [userName, setUserName] = useState("");
  let [password, setPassword] = useState("");
  const inputs = ["username", "password"];
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(true);

  const changeUserName = (e) => {
    setUserName((userName = e.target.value));
  };

  const changePassword = (e) => {
    setPassword((password = e.target.value));
  };

  const submitLogin = () => {
    const body = JSON.stringify({
      userName: userName,
      password: password,
    });
    fetch(`${config.baseURL}${urlconfig.login.uri}`, {
      method: urlconfig.login.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then((res) => {
        inputs.forEach((input) => {
          document.getElementById(input).value = "";
        });
        if (res.status === 200) {
          return res.json();
        } else {
          setIsLoginSuccessful(false);
        }
      })
      .then((response) => {
        console.log("response", response.userName);
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", response.userName);
        localStorage.setItem("userId",response.userId)
        toggleLogIn();
        history.push("/");
      });
  };

  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Row>
        <Col xs="4"></Col>
        <Col xs="4">
          <Card>
            <CardBody>
              <Form>
                <FormGroup>
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>USERNAME</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      size="sm"
                      type="text"
                      name="username"
                      id="username"
                      onChange={changeUserName}
                      autoComplete="off"
                    />
                  </InputGroup>
                  <br />
                  <InputGroup size="sm">
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>PASSWORD</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      size="sm"
                      type="password"
                      name="password"
                      id="password"
                      onChange={changePassword}
                    />
                  </InputGroup>

                  <br />
                  <Button block color="info" size="sm" onClick={submitLogin}>
                    LOGIN
                  </Button>
                </FormGroup>
              </Form>
              {!isLoginSuccessful ? (
                <Alert color="danger"> Invalid Credentials!!</Alert>
              ) : (
                <React.Fragment />
              )}
            </CardBody>
          </Card>
        </Col>
        <Col xs="4"></Col>
      </Row>
    </div>
  );
};

export default Login;

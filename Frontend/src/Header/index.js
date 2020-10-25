import React, { useContext, useState } from "react";
import LoginContext from "../context/loginContext";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button,
  Badge,
  ButtonGroup,
} from "reactstrap";
import { Link, useHistory } from "react-router-dom";

const Header = (props) => {
  const loginContext = useContext(LoginContext);
  const { isLoggedIn, toggleLogIn } = useContext(LoginContext);

  let history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toggleLogIn();
    history.push("/login");
  };

  const myProfileURL = `/userblog/${localStorage.getItem("userId")}`;

  return (
    <div>
      <Navbar color="info" expand="lg" fixed="top">
        <NavbarBrand className="navbar-brand" href="/">
          <h4>Content Management System</h4>
        </NavbarBrand>
        <Nav className="mr-auto" navbar></Nav>

        {loginContext.isLoggedIn ? (
          <Link to={myProfileURL}>
            <NavLink>{localStorage.getItem("user")}</NavLink>
          </Link>
        ) : (
          <React.Fragment />
        )}
        <NavItem>
          {loginContext.isLoggedIn ? (
            <Button size="sm" color="white" onClick={handleLogout}>
              LOGOUT
            </Button>
          ) : (
            <React.Fragment>
              <ButtonGroup>
                <Button
                  size="sm"
                  color="white"
                  onClick={() => history.push("/login")}
                >
                  LOGIN
                </Button>
                <Button
                  size="sm"
                  color="white"
                  onClick={() => history.push("/signup")}
                >
                  SIGNUP
                </Button>
              </ButtonGroup>
            </React.Fragment>
          )}
        </NavItem>
      </Navbar>
    </div>
  );
};

export default Header;

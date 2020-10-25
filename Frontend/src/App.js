import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./Login/loginPage";
import LoginContext from "./context/loginContext";
import { createBrowserHistory } from "history";
import Header from "./Header";
import Home from "./Home";
import SignUp from "./Signup";
import AddBlog from "./Templates/addBlog";
import UserBlog from "./Templates/userBlog";
import EditBlog from './Templates/editBlog';

const history = createBrowserHistory();

function App() {
  const token = localStorage.getItem("token");
  const [isLoggedIn, setisLoggedIn] = useState(token ? true : false);
  const toggleLogIn = () => setisLoggedIn(isLoggedIn ? false : true);
  return (
    <Router history={history}>
      <div>
        <LoginContext.Provider value={{ isLoggedIn, toggleLogIn }}>
          <Header />
          <Switch>
            <Route
              exact
              path="/login"
              render={() => <Login history={history} />}
            />
            <Route exact path="/signup" render={() => <SignUp />} />
            <Route exact path="/addblog" render={() => <AddBlog />} />
            <Route exact path="/userblog/:id" component={UserBlog} />
            <Route exact path ="/editblog/:id" component = {EditBlog} />
            <Route exact path="/" render={() => <Home />} />
          </Switch>
        </LoginContext.Provider>
      </div>
    </Router>
  );
}

export default App;

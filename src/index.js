import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.2.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import RegisterLayout from "layouts/Register.js";

const hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route
        path="/admin"
        render={(props) =>
          localStorage.getItem("userData") ? (
            <AdminLayout {...props} />
          ) : (
            <Redirect to="login" {...props} />
          )
        }
      />
      <Route path="/login" render={(props) => <AuthLayout {...props} />} />
      <Route
        path="/register"
        render={(props) => <RegisterLayout {...props} />}
      />
      <Route
        path="/logout"
        render={(props) => {
          localStorage.removeItem("userData");
          localStorage.removeItem("userEmail");
          document.documentElement.classList.toggle("nav-open");
          
          return <Redirect to="login" {...props} />
        }}
      />
      <Route
        exact
        path="/"
        render={(props) =>
          localStorage.getItem("userData") ? (
            <Redirect to="admin/dashboard" {...props} />
          ) : (
            <Redirect to="login" {...props} />
          )
        }
      />
    </Switch>
  </Router>,
  document.getElementById("root")
);

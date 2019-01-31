import React, { Component } from "react";
import { Route } from "react-router-dom";
import routes from "./routes";
import "./assests/css/app.css";
import unregister from "./interceptor";
import HeaderComponent from "./components/header/headerComponent";

class App extends Component {
  render() {
    return (
      <div>
        <HeaderComponent />
        {routes.map((route, i) => <Route key={i} {...route} />)}
      </div>
    );
  }
}

export default App;

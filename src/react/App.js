import React, { Component } from "react";
import { Route } from "react-router-dom";
import routes from "./routes";
import "./assests/css/app.css";

class App extends Component {
  render() {
    return (
      <div>
        {routes.map((route, i) => <Route key={i} {...route} />)}
      </div>
    );
  }
}

export default App;

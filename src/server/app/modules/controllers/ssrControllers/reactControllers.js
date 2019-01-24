import { matchPath } from "react-router-dom";
import routes from "../../../../../react/routes";
import configureStore from "../../../../../react/redux/configureStore";
// import "source-map-support/register";
import template from "../../../../renderFunction/template";
import render from "../../../../renderFunction/render";

export default function(req, res, next) {
  const store = configureStore();
  const promises = routes.reduce((acc, route) => {
    if (matchPath(req.url, route) && route.component && route.component.initialAction) {
      acc.push(Promise.resolve(store.dispatch(route.component.initialAction())));
    }
    return acc;
  }, []);

  Promise.all(promises)
    .then(() => {
      const initialData = store.getState();
      const response = template("Server Rendered Page", initialData, render(req, store))
      res.send(response);
    })
    .catch(next);
  }
  
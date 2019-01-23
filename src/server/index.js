import express from "express";
// import cors from "cors";
import { matchPath } from "react-router-dom";
// import serialize from "serialize-javascript";
import routes from "../react/routes";
import configureStore from "../react/redux/configureStore";
// import "source-map-support/register";
import template from "./template";
import render from "./render";

const app = express();

// app.use(cors());
app.use(express.static("public"));

app.get("/api/news", (req, res) => {
  res.json([
    {
      id: 1,
      upvotes: 130,
      title: "Fianto Duri, the complete tutorial",
      author: "RubeusH",
      date: new Date("2017-04-14T15:30:00.000Z")
    },
    {
      id: 2,
      upvotes: 126,
      title: "Ordinary Wizarding Levels study guide",
      author: "BathBabb",
      date: new Date("2017-04-14T15:30:00.000Z")
    }
  ]);
});

app.get("*", (req, res, next) => {
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
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening");
});

// import express from "express";
const express = require('express');
// import cors from "cors";
import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter, matchPath } from "react-router-dom";
// import serialize from "serialize-javascript";
import routes from "../react/routes";
import configureStore from "../react/redux/configureStore";
import App from "../react/App";
// import "source-map-support/register";

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
      const context = {};
      const markup = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      );

      const initialData = store.getState();
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>W Combinator</title>
            <link rel="stylesheet" href="/css/main.css">
            <script src="/bundle.js" defer></script>
            <script>window.__initialData__ = ${JSON.stringify(initialData)}</script>
          </head>

          <body>
            <div id="root">${markup}</div>
          </body>
        </html>
      `);
    })
    .catch(next);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is listening");
});

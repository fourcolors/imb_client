import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Movie from "./Movie";
import * as serviceWorker from "./serviceWorker";
import UrlPattern from "url-pattern";
import { find } from "ramda";
const createBrowserHistory = require("history").createBrowserHistory;
const history = createBrowserHistory();

const routes = [
  {
    path: "/",
    component: App
  },
  {
    path: "/movie/:id",
    component: Movie
  }
];

const Router = ({ routes }) => {
  const [location, setLocation] = useState(history.location);
  useEffect(() => {
    const unlisten = history.listen((location, action) => {
      setLocation(location);
    });
    return () => {
      unlisten();
    };
  });

  let params;
  const route = find(route => {
    const pattern = new UrlPattern(route.path);
    return (params = pattern.match(location.pathname));
  }, routes);

  if (!route) {
    return <div>Error 404, page not found</div>;
  }

  if (route.check && route.check()) {
    history.push(route.redirect);
    history.go();
    return null;
  }

  return <route.component {...params} />;
};

const Main = () => {
  return <Router routes={routes} />;
};

ReactDOM.render(<Main />, document.getElementById("root"));

serviceWorker.unregister();

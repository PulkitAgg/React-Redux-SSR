import Home from "./containers/Home";
import News from "./containers/News";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/news",
    component: News
  }
];

export default routes;

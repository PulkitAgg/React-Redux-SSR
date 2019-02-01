import Home from "./containers/home";
import News from "./containers/news";
import NotFound from "./components/notFound/notFoundComponent";

const routes = [
  {
    path: "/",
    exact: true,
    component: Home
  },
  {
    path: "/news",
    component: News
  },{
    path:'/*',
    component: NotFound
  }
];

export default routes;

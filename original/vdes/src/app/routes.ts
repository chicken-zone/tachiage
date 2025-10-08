import { type RouteConfig, route, index } from "./route-helpers";
import TopPage from "../pages/TopPage";
import MainPage from "../pages/MainPage";
import AboutPage from "../pages/AboutPage";

export default [
  index(TopPage),
  route("about", AboutPage),
  route("main", MainPage),
] satisfies RouteConfig[];
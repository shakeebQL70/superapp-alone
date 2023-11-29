import React, { lazy } from "react";
import OpmsRoutes from "OPMS/routes";
// import MdmRoutes from "MDM/routes";
// import EdRoutes from "EDXPERT/routes";
import { TRoute } from "./types";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("../components/Home"));
const Root = lazy(() => import("../components/Root"));
const Login = lazy(() => import("../components/Login"));
const NoRoute = lazy(() => import("../components/NoRoute"));

export const UnAuthRoutes = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NoRoute url="login" />,
  },
]);

const superApp = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "*",
    element: <NoRoute url="/" />,
  },
];

const opms: TRoute[] = OpmsRoutes?.map((route: TRoute) => ({
  ...route,
  path: `opms/${route.path}`,
}));

// const mdm: TRoute[] = MdmRoutes?.map((route: TRoute) => ({
//   ...route,
//   path: `mdm/${route.path}`,
// }));

// const ed: TRoute[] = EdRoutes?.map((route: TRoute) => ({
//   ...route,
//   path: `edxpert/${route.path}`,
// }));

export const allRoutes: TRoute[] = [...superApp, ...opms];

const AuthRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [...allRoutes],
  },
]);

export default AuthRoutes;

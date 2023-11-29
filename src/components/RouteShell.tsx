import React, { Suspense } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { TRoute } from "../utils/types";

const RouteShell: React.FunctionComponent<{
  routes: TRoute[];
}> = ({ routes }) => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default RouteShell;

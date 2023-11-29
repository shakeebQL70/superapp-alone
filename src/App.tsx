import React, { Suspense, useEffect } from "react";
import { createRoot } from "react-dom/client";
import allRoutes, { UnAuthRoutes } from "./utils/routes";
import useAuth from "./hooks/useAuth";
import { RouterProvider } from "react-router-dom";
import "./index.scss";
import ErrorBoundary from "./components/ErrorBoundaries";
const App = () => {
  const isLoggedIn = useAuth();
  const currentRoute = isLoggedIn ? allRoutes : UnAuthRoutes;

  return (
    <ErrorBoundary>
      <Suspense fallback={<h1>App Loading please wait...</h1>}>
        <RouterProvider router={currentRoute} />
      </Suspense>
    </ErrorBoundary>
  );
};

const container = document.getElementById("app");
const root = createRoot(container!);
root.render(<App />);

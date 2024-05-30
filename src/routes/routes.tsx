import { lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import LoginPrivateRoute from "../components/LoginPrivateRoute";

/* -----------------------------AUTH--------------------------------- */

const AccessDeniedPage = lazy(() => import("../pages/auth/Access"));
const Login = lazy(() => import("../pages/auth/Login"));
const Logout = lazy(() => import("../pages/auth/Logout"));
const NotFound = lazy(() => import("../pages/auth/NotFound"));
const Signup = lazy(() => import("../pages/auth/Signup"));

/* ----------------------------PAGE--------------------------------- */

const Homepage = lazy(() => import("../pages/Homepage"));
const Users = lazy(() => import("../pages/Users"));
const Tasks = lazy(() => import("../pages/Tasks"));
const Messages = lazy(() => import("../pages/Messages"));

/* ------------------------------------------------------------------ */

const Router = () => {
  const routes = useRoutes([
    {
      element: (
        <LoginPrivateRoute>
          <Outlet />
        </LoginPrivateRoute>
      ),
      children: [
        { element: <Homepage />, index: true },
        { path: "users", element: <Users /> },
        { path: "tasks", element: <Tasks /> },
        { path: "messages", element: <Messages /> },
      ],
    },
    {
      path: "auth",
      element: <Outlet />,
      children: [
        { path: "login", element: <Login /> },
        { path: "logout", element: <Logout /> },
        { path: "signup", element: <Signup /> },
        { path: "access", element: <AccessDeniedPage /> },
      ],
    },
    {
      path: "404",
      element: <NotFound />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
};

export default Router;

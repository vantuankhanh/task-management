import { lazy } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import LoginPrivateRoute from "../components/LoginPrivateRoute";
import LoggedInPrivateRoute from "../components/LoggedInPrivateRoute";
import LayoutMain from "../layout/main/layout-main";

/* -----------------------------AUTH--------------------------------- */

const AccessDeniedPage = lazy(() => import("../pages/auth/Access"));
const Login = lazy(() => import("../pages/auth/Login"));
const Logout = lazy(() => import("../pages/auth/Logout"));
const NotFound = lazy(() => import("../pages/auth/NotFound"));
const SignupEmail = lazy(() => import("../pages/auth/SignupEmail"));

/* ----------------------------PAGE--------------------------------- */

const Homepage = lazy(() => import("../pages/Homepage"));
const Employee = lazy(() => import("../pages/Employee"));
const Tasks = lazy(() => import("../pages/Tasks"));
const Messages = lazy(() => import("../pages/Messages"));

/* ------------------------------------------------------------------ */

const Router = () => {
  const routes = useRoutes([
    {
      element: (
        <LoginPrivateRoute>
          <LayoutMain>
            <Outlet />
          </LayoutMain>
        </LoginPrivateRoute>
      ),
      children: [
        { path: "", element: <Homepage /> },
        { path: "employee", element: <Employee /> },
        { path: "tasks", element: <Tasks /> },
        { path: "messages", element: <Messages /> },
      ],
    },
    {
      path: "auth",
      element: <Outlet />,
      children: [
        {
          path: "login",
          element: (
            <LoggedInPrivateRoute>
              <Login />
            </LoggedInPrivateRoute>
          ),
        },
        { path: "logout", element: <Logout /> },
        { path: "signup-email", element: <SignupEmail /> },
        { path: "403", element: <AccessDeniedPage /> },
        { path: "404", element: <NotFound /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/auth/404" replace />,
    },
  ]);

  return routes;
};

export default Router;

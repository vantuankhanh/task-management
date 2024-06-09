import { Navigate } from "react-router-dom";
import { clearAllCookie } from "../utils/cookieHandler";

interface ILoginPrivateRouteProps {
  children: JSX.Element;
}

const LoginPrivateRoute = ({ children }: ILoginPrivateRouteProps) => {
  const token = localStorage.getItem("refresh_token");

  if (!token) {
    clearAllCookie();
    localStorage.clear();

    return <Navigate to="/auth/logout" />;
  }

  return <>{children}</>;
};

export default LoginPrivateRoute;

import { Navigate } from "react-router-dom";
import { IChildrenProps } from "../models/ChildrenProps";

const LoggedInPrivateRoute = ({ children }: IChildrenProps) => {
  const data = localStorage.getItem("refresh_token");

  if (data) {
    return <Navigate to="/" />;
  }
  return <div className="w-screen h-screen">{children}</div>;
};

export default LoggedInPrivateRoute;

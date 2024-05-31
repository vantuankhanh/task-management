import { Navigate } from "react-router-dom";
import { IChildrenProps } from "../models/ChildrenProps";
import { checkLoggedStorage } from "../utils/checkLoggedStorage";

const LoggedInPrivateRoute = ({ children }: IChildrenProps) => {
  if (checkLoggedStorage()) {
    return <Navigate to="/" />;
  }
  return <div className="w-screen h-screen">{children}</div>;
};

export default LoggedInPrivateRoute;

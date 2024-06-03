import { Navigate } from "react-router-dom";
import { useUser } from "../hooks/use-user";
import { lazy } from "react";

const EmployeeAdmin = lazy(() => import("../section/employee/EmployeeAdmin"));

const Employee = () => {
  const user = useUser();
  const role = user ? user.role : 1;

  if (role !== 0) {
    return <EmployeeAdmin />;
  }
  return <Navigate to="/auth/access" />;
};

export default Employee;

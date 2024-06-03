import { lazy } from "react";
import { Navigate } from "react-router-dom";
import { useRole } from "../hooks/use-user";

const EmployeeAdmin = lazy(() => import("../section/employee/EmployeeAdmin"));

const Employee = () => {
  const role = useRole();

  // if (role !== 0) {
  return <EmployeeAdmin />;
  // }
  // return <Navigate to="/auth/access" />;
};

export default Employee;

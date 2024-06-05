import { Navigate } from "react-router-dom";

const Logout = () => {
  localStorage.clear();

  return <Navigate to="/auth/login" state={{}} />;
};

export default Logout;

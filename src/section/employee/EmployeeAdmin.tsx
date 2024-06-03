import { useEffect, useState } from "react";
import TableUser from "./TableUser";
import { IEmployeeModel } from "../../models/EmployeeModel";
import { getEmployee } from "../../services/employeeService";

const EmployeeAdmin = () => {
  const [empLst, setEmpLst] = useState<IEmployeeModel[]>([]);

  const getEmpLst = async () => {
    const data = await getEmployee();
    setEmpLst(data);
  };

  useEffect(() => {
    getEmpLst();
  }, []);

  return (
    <>
      <TableUser empLst={empLst} />
    </>
  );
};

export default EmployeeAdmin;

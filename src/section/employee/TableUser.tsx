import { IEmployeeModel } from "../../models/EmployeeModel";

interface ITableUserProps {
  empLst: IEmployeeModel[];
}

const TableUser = ({ empLst }: ITableUserProps) => {
  return (
    <table className="w-full">
      <thead>
        <tr>
          <td>No.</td>
          <td>Email</td>
          <td>Name</td>
          <td>Phone number</td>
          <td>Status</td>
          <td>Role</td>
        </tr>
      </thead>
    </table>
  );
};

export default TableUser;

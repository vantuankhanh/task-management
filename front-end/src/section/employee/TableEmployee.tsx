import { useState } from "react";
import { Button } from "rsuite";
import { IEmployeeModel } from "../../models/EmployeeModel";
import "../../style/table.scss";
import ModalDeleteEmployee from "./ModalDeleteEmployee";

interface ITableUserProps {
  empLst: IEmployeeModel[];
  getEmployee: () => Promise<void>;
  setEmpUpdate: (item: IEmployeeModel) => void;
}

const TableEmployee = ({
  empLst,
  getEmployee,
  setEmpUpdate,
}: ITableUserProps) => {
  const [idDelete, setIdDelete] = useState<string | null>(null);

  return (
    <>
      <ModalDeleteEmployee
        idDelete={idDelete}
        setIdDelete={setIdDelete}
        getEmployee={getEmployee}
      />

      <table className="w-full table-border">
        <thead>
          <tr>
            <td className="max-w-10">No.</td>
            <td className="w-3/12">Email</td>
            <td className="w-3/12">Name</td>
            <td>Phone number</td>
            <td>Status</td>
            <td>Role</td>
            <td>Action</td>
          </tr>
        </thead>

        {empLst.length > 0 && (
          <tbody>
            {empLst.map((e, i) => (
              <tr key={e.id ?? "" + i} className="hover:bg-gray-200">
                <td>{i + 1}</td>
                <td>{e.email}</td>
                <td>{e.name}</td>
                <td>{e.phoneNumber}</td>
                <td>
                  <div className="box-center">
                    {e.status ? (
                      <div className="box-center w-8/12 py-1 px-8 bg-green-200 text-green-500 text-xs text-center">
                        <p>Active</p>
                      </div>
                    ) : (
                      <div className="box-center w-8/12 py-1 px-8 bg-red-200 text-red-500 text-xs text-center">
                        <p>Deactive</p>
                      </div>
                    )}
                  </div>
                </td>
                <td>{e.role === 0 ? "Employee" : "Owner"}</td>
                <td>
                  <div className="w-full flex justify-center">
                    <Button
                      className="mr-4"
                      appearance="primary"
                      onClick={() => setEmpUpdate(e)}
                    >
                      Edit
                    </Button>
                    <Button
                      appearance="primary"
                      color="red"
                      disabled={(e.role ?? 0) > 0}
                      onClick={() => setIdDelete(e.id!)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>

      {empLst.length === 0 && (
        <div className="p-4 text-xl border-b border-gray-400">
          There is no Employee found
        </div>
      )}
    </>
  );
};

export default TableEmployee;

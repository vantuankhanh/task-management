import { useState } from "react";
import { Button } from "rsuite";
import { IEmployeeModel } from "../../models/EmployeeModel";
import { ITaskModel } from "../../models/TaskModel";
import "../../style/table.scss";
import ModalCreateUpdateTask from "./ModalCreatUpdateTask";
import ModalDeleteTask from "./ModalDeleteTask";
import { useRole } from "../../hooks/use-user";

interface ITableTaskProps {
  empList: IEmployeeModel[];
  taskLst: ITaskModel[];
  getTask: () => Promise<void>;
}

const TableTask = ({ empList, taskLst, getTask }: ITableTaskProps) => {
  const role = useRole();

  const [idDelete, setIdDelete] = useState<string | null>(null);

  const [visibleUpdate, setVisibleUpdate] = useState(false);
  const [taskUpdate, setTaskUpdate] = useState<ITaskModel | null>(null);

  const setItemUpdate = (item: ITaskModel) => {
    setVisibleUpdate(true);
    setTaskUpdate(item);
  };

  const openCreateModal = () => {
    setVisibleUpdate(true);
    setTaskUpdate(null);
  };

  return (
    <>
      <ModalCreateUpdateTask
        empList={empList}
        item={taskUpdate}
        visible={visibleUpdate}
        setVisible={setVisibleUpdate}
        getTask={getTask}
      />

      <ModalDeleteTask
        idDelete={idDelete}
        setIdDelete={setIdDelete}
        getTask={getTask}
      />

      <div>
        <h1 className="text-3xl p-6 mb-2">Manage Tasks</h1>

        <div className="w-full flex px-6 mb-8">
          <div className="flex-1">
            <p className="text-xl">
              <span className="font-bold">Total:</span> {taskLst.length} Task
              {taskLst.length > 0 ? "s" : ""}
            </p>
          </div>

          <div className="flex gap-4 items-center">
            {role !== 0 && (
              <div>
                <Button appearance="ghost" onClick={openCreateModal}>
                  + Create Task
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <table className="w-full table-border">
        <thead>
          <tr>
            <td>No.</td>
            <td className="w-3/12">Employee Email</td>
            <td className="w-3/12">Content</td>
            <td>Time Start</td>
            <td>Time End</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>

        {taskLst.length > 0 && (
          <tbody>
            {taskLst.map((e, i) => (
              <tr key={e.id ?? "" + i} className="hover:bg-gray-200">
                <td>{i + 1}</td>
                <td
                  className="break-all"
                  style={{ textAlign: "left", padding: "1rem 2rem" }}
                >
                  {e.employeeEmail}
                </td>
                <td
                  className="text-wrap break-all"
                  style={{ textAlign: "left", padding: "1rem 2rem" }}
                >
                  {e.content}
                </td>
                <td>
                  {new Date(e.dateStart).toLocaleDateString("en-EN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td>
                  {new Date(e.dateEnd).toLocaleDateString("en-EN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td>
                  <div className="box-center">
                    {e.status === 1 ? (
                      <div className="box-center w-8/12 py-1 px-8 bg-green-200 text-green-500 text-xs text-center">
                        <p>Done</p>
                      </div>
                    ) : (
                      <div className="box-center w-8/12 py-1 px-8 bg-red-200 text-red-500 text-xs text-center">
                        <p>Pending</p>
                      </div>
                    )}
                  </div>
                </td>
                <td>
                  <div className="w-full flex justify-center">
                    <Button
                      className="mr-4"
                      appearance="primary"
                      onClick={() => setItemUpdate(e)}
                    >
                      Edit
                    </Button>
                    <Button
                      appearance="primary"
                      color="red"
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

      {taskLst.length === 0 && (
        <div className="p-4 text-xl border-b border-gray-400">
          There is no Task found
        </div>
      )}
    </>
  );
};

export default TableTask;

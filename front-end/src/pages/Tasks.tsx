import { useEffect, useState } from "react";
import TableTask from "../section/tasks/TableTask";
import { ITaskModel } from "../models/TaskModel";
import { useAppDispatch } from "../store/store";
import { setLoading } from "../store/reducer/reducer";
import { useRole, useUser } from "../hooks/use-user";
import { getTask } from "../services/taskService";
import { IEmployeeModel } from "../models/EmployeeModel";
import { getEmployee } from "../services/employeeService";

const Tasks = () => {
  const role = useRole();
  const user = useUser();
  const dispatch = useAppDispatch();

  const [taskLst, setTaskLst] = useState<ITaskModel[]>([]);
  const [empList, setEmpList] = useState<IEmployeeModel[]>([]);

  const getEmpLst = async () => {
    dispatch(setLoading(true));
    const data = await getEmployee();
    setEmpList(data ?? []);
    dispatch(setLoading(false));
  };

  const getTaskLst = async () => {
    dispatch(setLoading(true));
    const data = role === 0 ? await getTask(user!.id) : await getTask();
    setTaskLst(data ?? []);
    dispatch(setLoading(false));
  };

  const getEmpTask = async () => {
    dispatch(setLoading(true));
    await getEmpLst();
    await getTaskLst();
    dispatch(setLoading(false));
  };

  useEffect(() => {
    getEmpTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TableTask empList={empList} taskLst={taskLst} getTask={getTaskLst} />
    </>
  );
};

export default Tasks;

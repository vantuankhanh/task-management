import { ITaskModel } from "../models/TaskModel";
import { deleteAPI, getAPI, postAPI, putAPI } from "./apiFunction";

export const createTask = async (item: ITaskModel) => {
  const data = await postAPI(process.env.REACT_APP_URL_CREATE_TASK, item, {
    messageSuccess: "Create new task successfully",
    messageFail: "Create task failed",
  });
  return data;
};

export const updateTask = async (item: ITaskModel) => {
  const res = await putAPI(process.env.REACT_APP_URL_UPDATE_TASK, item, {
    messageSuccess: "Update task successfully",
    messageFail: "Update task failed",
  });
  return res;
};

export const deleteTask = async (task: ITaskModel) => {
  const res = await deleteAPI(process.env.REACT_APP_URL_GET_TASK, task, {
    messageSuccess: "Delete Task successfully",
    messageFail: "Delete Task failed",
  });
  return res;
};

export const getTask = async (id: string = "") => {
  const data = await getAPI(
    process.env.REACT_APP_URL_GET_TASK + `${id ? `/${id}` : ""}`
  );
  return data;
};

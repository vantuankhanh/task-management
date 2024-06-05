import { IMessageModel } from "../models/MessageModel";
import { postAPI } from "./apiFunction";

export const getMessage = async (from: string, to: string) => {
  const data = await postAPI(process.env.REACT_APP_URL_GET_MESSAGE, {
    from,
    to,
  });
  return data.data as IMessageModel[];
};

export const createMessage = async (
  from: string,
  to: string,
  message: string
) =>
  await postAPI(
    process.env.REACT_APP_URL_CREATE_MESSAGE,
    { from, to, message },
    {
      messageFail: "Create message failed",
    }
  );

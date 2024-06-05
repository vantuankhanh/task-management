import { useEffect, useRef, useState } from "react";
import { useUser } from "../hooks/use-user";
import { IEmployeeModel } from "../models/EmployeeModel";
import MessageArea from "../section/message/MessageArea";
import MessageContact from "../section/message/MessageContact";
import { useAppDispatch } from "../store/store";
import "../style/message.scss";
import { Socket, io } from "socket.io-client";
import { getMessage } from "../services/messageService";
import { setLoadingMessage } from "../store/reducer/reducer";
import { IMessageModel } from "../models/MessageModel";

const Messages = () => {
  const dispatch = useAppDispatch();
  const user = useUser();

  const socket = useRef<Socket>();

  useEffect(() => {
    if (user && socket) {
      socket.current = io(process.env.REACT_APP_SOCKET_IO_URL);
      socket.current.emit("connectServer", user.id);
    }
  }, [user]);

  const [currentUser, setCurrentUser] = useState<IEmployeeModel | null>(null);

  const [messageLst, setMessageLst] = useState<IMessageModel[]>([]);

  useEffect(() => {
    (async () => {
      if (currentUser) {
        dispatch(setLoadingMessage(true));
        const data = await getMessage(user?.id ?? "", currentUser.id ?? "");
        setMessageLst(data);
        dispatch(setLoadingMessage(false));
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <div className="message-wrapper">
      <MessageContact
        setCurrentChat={setCurrentUser}
        setMessageLst={setMessageLst}
      />

      <MessageArea
        currentUser={currentUser}
        messageLst={messageLst}
        socket={socket.current}
        setMessageLst={setMessageLst}
      />
    </div>
  );
};

export default Messages;

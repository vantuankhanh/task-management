import { useEffect, useRef, useState } from "react";
import { Button, Input } from "rsuite";
import { IEmployeeModel } from "../../models/EmployeeModel";
import { Socket } from "socket.io-client";
import { createMessage } from "../../services/messageService";
import { useUser } from "../../hooks/use-user";
import { IMessageModel } from "../../models/MessageModel";
import { useAppSelector } from "../../store/store";
import SpinnerIcon from "@rsuite/icons/legacy/Spinner";

interface IMessageAreaProps {
  currentUser: IEmployeeModel | null;
  messageLst: IMessageModel[];
  socket: Socket | undefined;
  setMessageLst: (value: React.SetStateAction<IMessageModel[]>) => void;
}

const MessageArea = ({
  currentUser,
  messageLst,
  socket,
  setMessageLst,
}: IMessageAreaProps) => {
  const { isLoadingMessage } = useAppSelector((s) => s.loadingStore);
  const user = useUser();
  const messageRef = useRef<HTMLDivElement>(null);

  const [message, setMessage] = useState<IMessageModel | null>(null);

  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (message: string) => {
        setMessage({
          isFrom: false,
          message,
          createdAt: new Date().toISOString(),
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (message) {
      setMessageLst((prev) => [...prev, message]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message]);

  useEffect(() => {
    if (messageRef && messageRef.current) {
      messageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messageLst]);

  const inputMessRef = useRef<HTMLTextAreaElement>(null);

  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (inputMessRef && inputMessRef.current && socket && currentUser) {
      const message = inputMessRef.current.value;

      inputMessRef.current.value = "";

      socket.emit("sendMessage", {
        to: currentUser.id,
        message,
      });

      setMessageLst((prev) => [
        ...prev,
        {
          isFrom: true,
          message,
          createdAt: new Date().toISOString(),
        },
      ]);

      await createMessage(user?.id ?? "", currentUser.id!, message);
    }
  };

  return (
    <div className="flex-1 flex flex-col gap-4">
      <div className="flex-1 rounded-2xl shadow border-gray-200 border p-8 overflow-y-auto">
        {!isLoadingMessage ? (
          currentUser ? (
            <div className="h-full flex flex-col">
              {messageLst.map((mess, i) => (
                <div ref={messageRef} key={"mess" + i} className="pb-4">
                  <div
                    className={`w-full flex ${
                      mess.isFrom ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div>
                      <p
                        className={`min-w-40 p-3 rounded-md shadow-md text-base ${
                          mess.isFrom ? "bg-blue-500 text-white" : ""
                        }`}
                      >
                        {mess.message ?? ""}
                      </p>
                      <p className="flex justify-end text-xs italic mt-1 pr-1">
                        {mess.createdAt &&
                          new Date(mess.createdAt).toLocaleDateString("en-EN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full box-center text-xl">
              <p>
                Select an <span className="text-blue-500">Employee</span> to
                begin a conversation
              </p>
            </div>
          )
        ) : (
          <div className="h-full w-full gap-3 box-center">
            <SpinnerIcon pulse style={{ fontSize: "1.5em" }} />
            <p className="text-lg font-bold">Loading...</p>
          </div>
        )}
      </div>

      <form className="flex gap-4 h-20" onSubmit={handleSendMessage}>
        <Input
          ref={inputMessRef}
          as="textarea"
          className="h-full"
          style={{ resize: "none" }}
          placeholder="Enter your message..."
        />
        <div>
          <Button type="submit" appearance="primary">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MessageArea;

import { useEffect, useState } from "react";
import { Button, Input } from "rsuite";
import { io } from "socket.io-client";

const Messages = () => {
  const [message, setMessage] = useState("");
  const [messageLst, setMessageLst] = useState([]);

  useEffect(() => {}, []);

  return (
    <div className="h-full flex-1 flex gap-4">
      <div className="w-4/12 ">
        <p>User list</p>
        <p>Room list</p>
        <p>Activity</p>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <div className="flex-1 rounded-2xl shadow border-gray-200 border p-8">
          <ul>Chat Display</ul>
        </div>

        <form className="flex gap-4">
          <Input placeholder="Enter your message..." />
          <Button appearance="primary">Send</Button>
        </form>
      </div>
    </div>
  );
};

export default Messages;

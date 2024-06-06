import { Button } from "rsuite";
import Home from "@rsuite/icons/legacy/Home";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const nav = useNavigate();

  return (
    <div className="w-screen h-screen box-center">
      <div className="flex flex-col gap-4">
        <p className="text-xl">
          404 <span className="mx-4 border-l-2 border-black"></span> Ops... The
          page is not found
        </p>

        <div className="flex justify-center">
          <Button appearance="primary" size="md" onClick={() => nav("/")}>
            <div className="flex gap-2 items-center">
              <Home />
              <p>Home Page</p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

import { Button } from "rsuite";
import Home from "@rsuite/icons/legacy/Home";
import { useNavigate } from "react-router-dom";

const Access = () => {
  const nav = useNavigate();

  return (
    <div className="w-screen h-screen box-center">
      <div className="flex flex-col gap-4">
        <div className="flex items-center text-xl">
          <p>403</p>
          <div className="h-12 w-1 mx-4 border-l-2 border-black"></div>
          <div>
            <p>Ops... The page you found is limited access!</p>
            <p>Contact admin for more information.</p>
          </div>
        </div>

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

export default Access;

import { useNavigate } from "react-router-dom";
import { Button } from "rsuite";

const Homepage = () => {
  const nav = useNavigate();

  return (
    <div className="box-center h-screen bg-slate-100">
      <div className="w-full px-4 py-8" style={{ maxWidth: "80rem" }}>
        <div className="w-1/2 p-20">
          <div>
            <h1 className="text-4xl mb-8">
              Welcome to <span className="text-blue-600">Task Manager</span>{" "}
              website
            </h1>

            <div>
              <Button
                appearance="primary"
                size="lg"
                onClick={() => nav("/employee")}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>

        <div className="flex-1"></div>
      </div>
    </div>
  );
};

export default Homepage;

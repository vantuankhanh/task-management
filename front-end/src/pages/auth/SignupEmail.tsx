import { useEffect, useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { Button, Input, InputGroup } from "rsuite";
import { createPassword } from "../../services/employeeService";
import { toast } from "react-toastify";
import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import { useAppDispatch } from "../../store/store";
import { setLoading } from "../../store/reducer/reducer";

const SignupChild = ({ id }: { id: string }) => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    localStorage.clear();
  }, []);

  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const onSubmit = async () => {
    if (password) {
      try {
        dispatch(setLoading(true));
        await createPassword(password, id);
        toast.success("Created password successfully. Please sign in!");
        dispatch(setLoading(false));
        nav("/");
      } catch (error) {
        toast.error("Signup failed");
      }
    } else {
      toast.error("Please enter your password");
    }
  };

  return (
    <div className="h-screen box-center">
      <div className="bg-white py-20 px-8 sm:px-20 shadow-xl rounded-xl border">
        <div className="text-center mb-8">
          <div className="text-gray-900 text-3xl font-bold mb-3">
            Account SignUp
          </div>
          <p className="text-gray-500 font-medium">
            Please enter your desired password
          </p>
        </div>

        <div>
          <InputGroup inside>
            <Input
              type={visible ? "text" : "password"}
              className="w-full"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e)}
              autoComplete="password"
            />
            <InputGroup.Button onClick={() => setVisible(!visible)}>
              {visible ? <EyeIcon /> : <EyeSlashIcon />}
            </InputGroup.Button>
          </InputGroup>
        </div>

        <div className="mt-6">
          <Button
            disabled={!password}
            className="w-full"
            color="blue"
            appearance="primary"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

const SignupEmail = () => {
  const [searchParams] = useSearchParams();
  if (!searchParams.get("id")) {
    console.log(searchParams.get("id"));
    return <Navigate to="/" />;
  }

  return <SignupChild id={searchParams.get("id")!.toString()} />;
};

export default SignupEmail;

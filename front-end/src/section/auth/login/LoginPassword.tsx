import EyeIcon from "@rsuite/icons/legacy/Eye";
import EyeSlashIcon from "@rsuite/icons/legacy/EyeSlash";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Input, InputGroup } from "rsuite";
import { LoginType } from "../../../models/LoginType";
import { login } from "../../../services/loginService";
import { setLoading } from "../../../store/reducer/reducer";
import { useAppDispatch } from "../../../store/store";

interface ILoginPasswordProps {
  setType: Dispatch<SetStateAction<LoginType>>;
}

const LoginPassword = ({ setType }: ILoginPasswordProps) => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitLogin = async () => {
    if (email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      dispatch(setLoading(true));

      const res = await login(email, password);

      if (res) {
        if (res.status >= 200 && res.status < 300) {
          localStorage.setItem("refresh_token", res.data.data.refreshToken);

          nav("/");
        }
      }

      dispatch(setLoading(false));
    } else {
      toast.error("Please enter a valid phone number");
    }
  };

  const reset = useCallback(() => {
    setEmail("");
    setPassword("");
  }, []);

  const [visible, setVisible] = useState(false);

  return (
    <>
      <div>
        <div className="text-center mb-8">
          <div className="text-gray-900 text-3xl font-bold mb-3">Sign In</div>
          <span className="text-gray-500 font-medium">
            Enter your email and password
          </span>
        </div>

        <div>
          <Input
            className="w-full mb-4"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e)}
            autoComplete="email"
          />

          <InputGroup inside>
            <Input
              type={visible ? "text" : "password"}
              className="w-full"
              placeholder="Password"
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
            disabled={!email || !password}
            className="w-full"
            color="blue"
            appearance="primary"
            onClick={onSubmitLogin}
          >
            Sign In
          </Button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <p>
          I have an email.{" "}
          <Link
            to="#"
            onClick={() => {
              setType(LoginType.email);
              reset();
            }}
          >
            Sign in by email
          </Link>
        </p>
        <p>
          I have a phone number.{" "}
          <Link
            to="#"
            onClick={() => {
              setType(LoginType.phoneNumber);
              reset();
            }}
          >
            Sign in by phone
          </Link>
        </p>
      </div>
    </>
  );
};

export default LoginPassword;

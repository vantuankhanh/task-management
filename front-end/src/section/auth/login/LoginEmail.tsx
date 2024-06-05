import ArowBackIcon from "@rsuite/icons/ArowBack";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "rsuite";
import { LoginType } from "../../../models/LoginType";
import { toast } from "react-toastify";

interface ILoginEmailProps {
  setType: Dispatch<SetStateAction<LoginType>>;
  onSubmit: (
    type: string,
    phoneNumber?: string,
    email?: string
  ) => Promise<void>;
  onVerifyCode: (
    type: string,
    code: string,
    phoneNumber?: string,
    email?: string
  ) => Promise<void>;
}

const LoginEmail = ({ setType, onSubmit, onVerifyCode }: ILoginEmailProps) => {
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [emailSubmit, setEmailSubmit] = useState("");

  const onEmailChange = (e: string) => {
    setEmail(e);
  };

  const onSubmitEmail = async () => {
    if (email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
      setEmailSubmit(email);
      await onSubmit("email", undefined, email);
    } else {
      toast.error("Please enter a valid email");
    }
  };

  const [code, setCode] = useState("");

  const onCodeChange = (e: string) => {
    if (e.match(/^\d+$/) && e.length <= 6) {
      setCode(e);
    }
  };

  const onSubmitCode = async () =>
    await onVerifyCode("email", code, undefined, email);

  const onResendCode = async () => {
    await onSubmitEmail();
  };

  const reset = useCallback(() => {
    setEmail("");
    setEmailSubmit("");
  }, []);

  const onBackClick = () => {
    if (emailSubmit) {
      reset();
    } else {
      nav("/");
    }
  };

  return (
    <>
      <div
        className={`absolute top-0 left-0 p-5 ${!emailSubmit ? "hidden" : ""}`}
      >
        <Button appearance="subtle" onClick={onBackClick}>
          <div className="box-center gap-2">
            <ArowBackIcon />
            <span className="font-bold">Back</span>
          </div>
        </Button>
      </div>

      {!emailSubmit ? (
        <div>
          <div className="text-center mb-8">
            <div className="text-gray-900 text-3xl font-bold mb-3">Sign In</div>
            <span className="text-gray-500 font-medium">
              Enter your email to sign in
            </span>
          </div>

          <div>
            <Input
              className="w-full"
              placeholder="Your Email Address"
              value={email}
              onChange={onEmailChange}
              autoComplete="email"
            />
          </div>

          <div className="mt-6">
            <Button
              disabled={!email}
              className="w-full"
              color="blue"
              appearance="primary"
              onClick={onSubmitEmail}
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-center mb-8">
            <div className="text-gray-900 text-3xl font-bold mb-3">
              Email verification
            </div>
            <p className="text-gray-500 font-medium">
              Please enter your code
              <br />
              that send to your email
            </p>
          </div>

          <div>
            <Input
              className="w-full"
              placeholder="Enter your code"
              value={code}
              onChange={onCodeChange}
            />
          </div>

          <div className="mt-6">
            <Button
              disabled={!code}
              className="w-full"
              color="blue"
              appearance="primary"
              onClick={onSubmitCode}
            >
              Submit
            </Button>
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        {!emailSubmit ? (
          <>
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
            <p>
              I have an account.{" "}
              <Link
                to="#"
                onClick={() => {
                  setType(LoginType.password);
                  reset();
                }}
              >
                Sign in by account
              </Link>
            </p>
          </>
        ) : (
          <>
            Code not receive?{" "}
            <Link to="#" onClick={onResendCode}>
              Send again
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default LoginEmail;

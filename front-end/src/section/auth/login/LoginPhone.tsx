import ArowBackIcon from "@rsuite/icons/ArowBack";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, InputGroup, Tooltip, Whisper } from "rsuite";
import { LoginType } from "../../../models/LoginType";
import { toast } from "react-toastify";

interface ILoginPhoneProps {
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

const LoginPhone = ({ setType, onSubmit, onVerifyCode }: ILoginPhoneProps) => {
  const nav = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneSubmit, setPhoneSubmit] = useState("");

  const onPhoneNumberChange = (e: string) => {
    if (e.match(/^\d+$/) || e === "") {
      setPhoneNumber(e);
    }
  };

  const onSubmitPhone = async () => {
    if (phoneNumber.match(/^\d+$/)) {
      setPhoneSubmit(phoneNumber);
      await onSubmit("phoneNumber", `+${phoneNumber}`);
    } else {
      toast.error("Please enter a valid phone number");
    }
  };

  const [code, setCode] = useState("");

  const onCodeChange = (e: string) => {
    if (e.match(/^\d+$/) && e.length <= 6) {
      setCode(e);
    }
  };

  const onSubmitCode = async () =>
    await onVerifyCode("phoneNumber", code, `+${phoneNumber}`);

  const onResendCode = async () => {
    await onSubmitPhone();
  };

  const reset = useCallback(() => {
    setPhoneNumber("");
    setPhoneSubmit("");
  }, []);

  const onBackClick = () => {
    if (phoneSubmit) {
      reset();
    } else {
      nav("/");
    }
  };

  return (
    <>
      <div
        className={`absolute top-0 left-0 p-5 ${!phoneSubmit ? "hidden" : ""}`}
      >
        <Button appearance="subtle" onClick={onBackClick}>
          <div className="box-center gap-2">
            <ArowBackIcon />
            <span className="font-bold">Back</span>
          </div>
        </Button>
      </div>

      {!phoneSubmit ? (
        <div>
          <div className="text-center mb-8">
            <div className="text-gray-900 text-3xl font-bold mb-3">Sign In</div>
            <span className="text-gray-500 font-medium">
              Enter your phone to sign in
            </span>
          </div>

          <div>
            <Whisper
              placement="bottom"
              speaker={
                <Tooltip>Please input your phone with country code</Tooltip>
              }
            >
              <InputGroup inside>
                <InputGroup.Addon>+</InputGroup.Addon>
                <Input
                  className="w-full"
                  placeholder="Your Phone Number"
                  value={phoneNumber}
                  onChange={onPhoneNumberChange}
                  autoComplete="tel-national"
                />
              </InputGroup>
            </Whisper>
          </div>

          <div className="mt-6">
            <Button
              disabled={!phoneNumber}
              className="w-full"
              color="blue"
              appearance="primary"
              onClick={onSubmitPhone}
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="text-center mb-8">
            <div className="text-gray-900 text-3xl font-bold mb-3">
              Phone verification
            </div>
            <p className="text-gray-500 font-medium">
              Please enter your code
              <br />
              that send to your phone
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
        {!phoneSubmit ? (
          <>
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

export default LoginPhone;

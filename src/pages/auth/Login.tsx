import ArowBackIcon from "@rsuite/icons/ArowBack";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, InputGroup, Tooltip, Whisper } from "rsuite";
import { sendVerifyCode, submitVerifyCode } from "../../services/login";
import { setLoading } from "../../store/reducer/reducer";
import { useAppDispatch } from "../../store/store";
import { toast } from "react-toastify";

const Login = () => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneSubmit, setPhoneSubmit] = useState("");

  const onPhoneNumberChange = (e: string) => {
    if (e.match(/^\d+$/) || e === "") {
      setPhoneNumber(e);
    }
  };

  // TODO: call api send otp
  const onSubmitPhone = async () => {
    if (phoneNumber.match(/^\d+$/)) {
      dispatch(setLoading(true));
      setPhoneSubmit(phoneNumber);

      const res = await sendVerifyCode("phoneNumber", `+${phoneNumber}`);
      if (!res || res.status > 300) {
        toast.error("Failed to send verification code");
      }

      dispatch(setLoading(false));
    }
  };

  const [code, setCode] = useState("");

  const onCodeChange = (e: string) => {
    if (e.match(/^\d+$/) && e.length <= 6) {
      setCode(e);
    }
  };

  // TODO: submit otp
  const onSubmitCode = async () => {
    dispatch(setLoading(true));

    const res = await submitVerifyCode("phoneNumber", code, `+${phoneSubmit}`);

    if (res) {
      if (res.status >= 200 && res.status < 300) {
        localStorage.setItem("refresh_token", res.data.data.refreshToken);

        nav("/employee");
      }
    } else {
      toast.error("Failed to verify code");
    }

    dispatch(setLoading(false));
  };

  // TODO: resen otp
  const onResendCode = async () => {};

  const onBackClick = () => {
    if (phoneSubmit) {
      setPhoneNumber("");
      setPhoneSubmit("");
    } else {
      nav("/");
    }
  };

  return (
    <div className="box-center flex-col bg-white min-h-full min-w-full overflow-hidden px-4">
      <div
        className="bg-white py-20 px-8 sm:px-20 shadow-xl rounded-xl relative "
        style={{ maxWidth: "26rem" }}
      >
        <div className="absolute top-0 left-0 p-5">
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
              <div className="text-gray-900 text-3xl font-bold mb-3">
                Sign In
              </div>
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
                    prefix="+"
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
              Don't have an account? <Link to="/auth/signup">Sign Up</Link>
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
      </div>
    </div>
  );
};

export default Login;

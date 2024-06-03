import ArowBackIcon from "@rsuite/icons/ArowBack";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "rsuite";

const Login = () => {
  const nav = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneSubmit, setPhoneSubmit] = useState("");

  const onPhoneNumberChange = (e: string) => {
    if (e.match(/^\d+$/) || e === "") {
      setPhoneNumber(e);
    }
  };

  // TODO: call api send otp
  const onSubmitPhone = () => {
    if (phoneNumber.match(/^\d+$/)) {
      setPhoneSubmit(phoneNumber);
    }
  };

  const [code, setCode] = useState("");

  const onCodeChange = (e: string) => {
    if (e.match(/^\d+$/) && e.length <= 6) {
      setCode(e);
    }
  };

  // TODO: submit otp
  const onSubmitCode = () => {
    nav("/employee");
  };

  // TODO: resen otp
  const onResendCode = () => {};

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
              <Input
                className="w-full"
                placeholder="Your Phone Number"
                value={phoneNumber}
                onChange={onPhoneNumberChange}
                autoComplete="tel-national"
              />
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

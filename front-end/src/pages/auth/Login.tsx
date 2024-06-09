import { lazy, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginType } from "../../models/LoginType";
import { sendVerifyCode, submitVerifyCode } from "../../services/loginService";
import { setLoading } from "../../store/reducer/reducer";
import { useAppDispatch } from "../../store/store";

const LoginPhone = lazy(() => import("../../section/auth/login/LoginPhone"));
const LoginEmail = lazy(() => import("../../section/auth/login/LoginEmail"));
const LoginPassword = lazy(
  () => import("../../section/auth/login/LoginPassword")
);

const Login = () => {
  const nav = useNavigate();
  const dispatch = useAppDispatch();

  const [typeLogin, setTypeLogin] = useState(LoginType.phoneNumber);

  const [time, setTime] = useState<number>(30);
  const [isCountdown, setIsCountdown] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCountdown && time > 0) {
      timer = setTimeout(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else {
      setIsCountdown(false);
    }

    return () => clearInterval(timer);
  }, [time, isCountdown]);

  const onSubmit = async (
    type: string,
    phoneNumber?: string,
    email?: string
  ) => {
    if (!isCountdown) {
      dispatch(setLoading(true));

      setIsCountdown(true);
      setTime(30);
      const res = await sendVerifyCode(type, phoneNumber, email);
      if (!res || res.status > 300) {
        toast.error("Failed to send verification code");
      }

      dispatch(setLoading(false));
    } else {
      toast.warning(`Wait ${time}s to send verification code again`);
    }
  };

  const onVerifyCode = async (
    type: string,
    code: string,
    phoneNumber?: string,
    email?: string
  ) => {
    dispatch(setLoading(true));

    const res = await submitVerifyCode(type, code, phoneNumber, email);

    if (res) {
      if (res.status >= 200 && res.status < 300) {
        localStorage.setItem("refresh_token", res.data.data.refreshToken);

        nav("/");
      }
    } else {
      toast.error("Failed to verify code");
    }

    dispatch(setLoading(false));
  };

  return (
    <div className="box-center flex-col bg-white min-h-full min-w-full overflow-hidden px-4">
      <div
        className="bg-white py-20 px-8 sm:px-20 shadow-xl rounded-xl relative "
        style={{ maxWidth: "26rem" }}
      >
        {typeLogin === LoginType.phoneNumber && (
          <LoginPhone
            setType={setTypeLogin}
            onSubmit={onSubmit}
            onVerifyCode={onVerifyCode}
          />
        )}
        {typeLogin === LoginType.email && (
          <LoginEmail
            setType={setTypeLogin}
            onSubmit={onSubmit}
            onVerifyCode={onVerifyCode}
          />
        )}
        {typeLogin === LoginType.password && (
          <LoginPassword setType={setTypeLogin} />
        )}
      </div>
    </div>
  );
};

export default Login;

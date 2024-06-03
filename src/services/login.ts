import axios from "axios";
import { toast } from "react-toastify";
import { ILoginModel } from "../models/LoginModel";

export const login = async (email: string, password: string) => {
  try {
    const request = {
      email,
      password,
    };

    const res = await axios.post(
      process.env.REACT_APP_BASE_URL + process.env.REACT_APP_URL_LOGIN,
      request
    );

    if (res.status >= 200 && res.status < 300) {
      return res.data as ILoginModel;
    }
    return false;
  } catch {
    toast.error("Failed to login");
    return false;
  }
};

export const sendVerifyCode = async (
  type: string,
  phoneNumber?: string,
  email?: string
) => {
  try {
    const res = await axios.post(
      process.env.REACT_APP_BASE_URL +
        process.env.REACT_APP_URL_SEND_VERIFY_CODE,
      {
        type,
        phoneNumber,
        email,
      }
    );
    return res;
  } catch {
    return false;
  }
};

export const submitVerifyCode = async (
  type: string,
  accessCode: string,
  phoneNumber?: string,
  email?: string
) => {
  try {
    const res = await axios.post(
      process.env.REACT_APP_BASE_URL + process.env.REACT_APP_URL_VALIDATE_CODE,
      {
        type,
        phoneNumber,
        email,
        accessCode,
      }
    );

    return res;
  } catch {
    return false;
  }
};

import { useMemo } from "react";
import { IRefreshTokenDecodeModel } from "../models/RefreshTokenDecodeModel";
import { jwtDecode } from "jwt-decode";

export const useUser = () => {
  const token = localStorage.getItem("refresh_token");
  let data: IRefreshTokenDecodeModel | null;
  if (token) {
    data = jwtDecode(token as string);
  } else {
    data = null;
  }

  return useMemo(() => data, [data]);
};

export const useRole = () => {
  const user = useUser();
  const role = user ? user.role : 0;

  return useMemo(() => role, [role]);
};

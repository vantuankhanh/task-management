import { useMemo } from "react";
import { IRefreshTokenDecodeModel } from "../models/RefreshTokenDecodeModel";
import { jwtDecode } from "jwt-decode";

export const useUser = () => {
  const token = localStorage.getItem("refresh_token");
  const data: IRefreshTokenDecodeModel = jwtDecode(token as string);

  return useMemo(() => data, [data]);
};

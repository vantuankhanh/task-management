import { ReactElement } from "react";

export interface IMenuModel {
  label: string;
  to: string;
  url?: string;
  icon?: ReactElement;
  visible?: boolean;
  disabled?: boolean;
  key?: string;
}

import { ReactElement } from "react";

export interface IMenuModel {
  label: string;
  to?: string;
  url?: string;
  icon?: ReactElement;
  class?: string;
  seperator?: string;
  visible?: boolean;
  disabled?: boolean;
  key?: string;
}

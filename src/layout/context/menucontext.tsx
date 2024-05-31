import { Dispatch, SetStateAction, createContext, useState } from "react";
import { IChildrenProps } from "../../models/ChildrenProps";

interface IMenuContextProps {
  activeMenu: string;
  setActiveMenu: Dispatch<SetStateAction<string>>;
}

export const MenuContext = createContext({} as IMenuContextProps);

export const MenuProvider = ({ children }: IChildrenProps) => {
  const [activeMenu, setActiveMenu] = useState("");

  const value = {
    activeMenu,
    setActiveMenu,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

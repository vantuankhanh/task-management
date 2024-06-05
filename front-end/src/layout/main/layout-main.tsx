import { ReactNode } from "react";
import AppFooter from "./AppFooter";
import AppSidebar from "./AppSidebar";
import AppTopbar from "./AppTopbar";
import { IChildrenProps } from "../../models/ChildrenProps";

const LayoutWrap = ({ children }: IChildrenProps) => {
  return (
    <div className="wrapper">
      <AppTopbar />
      <div className="sidebar">
        <AppSidebar />
      </div>
      <div className="main-container">
        <div className="main-content">{children}</div>
        <AppFooter />
      </div>
    </div>
  );
};

const LayoutMain = ({ children }: { children: ReactNode }) => {
  return <LayoutWrap>{children}</LayoutWrap>;
};

export default LayoutMain;

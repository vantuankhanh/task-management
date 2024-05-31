import { ReactNode } from "react";
import AppFooter from "./AppFooter";
import AppSidebar from "./AppSidebar";
import AppTopbar from "./AppTopbar";
import { IChildrenProps } from "../../models/ChildrenProps";

const LayoutWrap = ({ children }: IChildrenProps) => {
  return (
    <div className="w-screen h-screen">
      <AppTopbar />
      <div className="layout-sidebar">
        <AppSidebar />
      </div>
      <div className="layout-main-container">
        <div className="layout-main">{children}</div>
        <AppFooter />
      </div>
      <div className="layout-mask"></div>
    </div>
  );
};

const LayoutMain = ({ children }: { children: ReactNode }) => {
  return <LayoutWrap>{children}</LayoutWrap>;
};

export default LayoutMain;

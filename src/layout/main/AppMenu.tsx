import FolderFillIcon from "@rsuite/icons/FolderFill";
import UserInfoIcon from "@rsuite/icons/Member";
import Message from "@rsuite/icons/Message";
import SignOut from "@rsuite/icons/legacy/SignOut";
import { useMemo } from "react";
import { useRole } from "../../hooks/use-user";
import { IMenuModel } from "../../models/MenuModel";
import AppMenuitem from "./AppMenuitem";

const AppMenu = () => {
  const role = useRole();

  const page: IMenuModel[] = useMemo(() => {
    const temp = [
      {
        label: "Manage Employee",
        icon: <UserInfoIcon />,
        to: "/employee",
        visible: role !== 0,
      },
      {
        label: "Manage Task",
        icon: <FolderFillIcon />,
        to: "/tasks",
      },
      {
        label: "Message",
        icon: <Message />,
        to: "/messages",
      },
    ];
    return temp;
  }, [role]);

  return (
    <div className="sidebar-menu">
      <ul className="flex-1">
        {page.map((item, i) => {
          return <AppMenuitem {...item} key={i + item.label} />;
        })}
      </ul>

      <hr className="m-3" />

      <ul>
        <AppMenuitem label="Sign out" icon={<SignOut />} to="/auth/logout" />
      </ul>
    </div>
  );
};

export default AppMenu;

import { useMemo } from "react";
import AppMenuitem from "./AppMenuitem";
import { useUser } from "../../hooks/use-user";
import { MenuProvider } from "../context/menucontext";
import { IMenuModel } from "../../models/MenuModel";

const AppMenu = () => {
  const role = useUser().role;

  const page: IMenuModel[] = useMemo(() => {
    const temp = [
      {
        label: "User",
        icon: <></>,
        to: "/users",
        visible: role !== 0,
      },
      {
        label: "Task",
        icon: <></>,
        to: "/tasks",
      },
      {
        label: "Message",
        icon: <></>,
        to: "/messages",
      },
    ];
    return temp;
  }, [role]);

  return (
    <MenuProvider>
      <div className="flex flex-column h-full">
        <ul className="layout-menu flex-1">
          {page.map((item, i) => {
            return !item?.seperator ? (
              <AppMenuitem label={item.label} key={item.label} />
            ) : (
              <li className="menu-separator"></li>
            );
          })}
        </ul>
        <div>
          <hr />
          <ul className="layout-menu">
            <ul>
              <AppMenuitem label="Logout" icon={<></>} to="/auth/logout" />
            </ul>
          </ul>
        </div>
      </div>
    </MenuProvider>
  );
};

export default AppMenu;

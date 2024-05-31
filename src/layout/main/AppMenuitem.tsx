import classNames from "classnames";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import usePathname from "../../hooks/use-pathname";
import { IMenuModel } from "../../models/MenuModel";
import { MenuContext } from "../context/menucontext";

const AppMenuitem = (props: IMenuModel) => {
  const pathname = usePathname();

  const { activeMenu, setActiveMenu } = useContext(MenuContext);
  const isActiveRoute = props.to && pathname === props.to;
  const active = activeMenu === props.key;

  const itemClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    //avoid processing disabled items
    if (props.disabled) {
      event.preventDefault();
      return;
    }

    // toggle active state
    setActiveMenu(props.key!);
  };

  return (
    <li
      className={classNames({
        "active-menuitem": active,
      })}
    >
      {props.visible !== false &&
        (props.to ? (
          <Link
            to={props.to}
            onClick={(e) => itemClick(e)}
            className={classNames(props!.class, {
              "active-route": isActiveRoute,
            })}
            tabIndex={0}
          >
            {props.icon}
            <span className="layout-menuitem-text">{props.label}</span>
          </Link>
        ) : (
          <a
            href={props.url}
            onClick={(e) => itemClick(e)}
            className={classNames(props.class)}
            tabIndex={0}
          >
            {props.icon}
            <span className="layout-menuitem-text">{props!.label}</span>
          </a>
        ))}
    </li>
  );
};

export default AppMenuitem;

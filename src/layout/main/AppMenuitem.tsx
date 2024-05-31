import classNames from "classnames";
import React from "react";
import { Link } from "react-router-dom";
import usePathname from "../../hooks/use-pathname";
import { IMenuModel } from "../../models/MenuModel";

const AppMenuitem = (props: IMenuModel) => {
  const pathname = usePathname();
  const isRoute = props.to && pathname === props.to;

  const itemClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    //avoid processing disabled items
    if (props.disabled) {
      event.preventDefault();
      return;
    }
  };

  return (
    <li>
      {props.visible !== false && (
        <Link
          to={props.to}
          onClick={(e) => itemClick(e)}
          className={classNames("menu-item", {
            "route-select": isRoute,
          })}
          tabIndex={0}
        >
          <div className="box-center text-xl">{props.icon}</div>
          <span>{props.label}</span>
        </Link>
      )}
    </li>
  );
};

export default AppMenuitem;

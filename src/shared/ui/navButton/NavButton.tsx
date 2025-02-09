import classNames from "classnames";
import style from "./NavButton.module.scss";
import { NavLink } from "react-router";

interface Props {
  className?: string;
  to: string;
  icon?: string;
  children?: string;
}

export const NavButton = (props: Props) => {
  const {
    className,
    children,
    to,
    icon,
  } = props;

  return (
    <NavLink
      className={classNames(style.nav_button, className)}
      to={to}
    >
      {icon && <img className={style.icon} src={icon} alt={""} />}
      {children}
    </NavLink>
  );
};

import classNames from "classnames";
import style from "./NavButton.module.scss";
import { NavLink } from "react-router";

interface Props {
  className?: string;
  to: string;
  icon?: string;
  children?: string;
  end?: boolean;
}

export const NavButton = (props: Props) => {
  const { className, children, to, icon, end = false } = props;

  return (
    <NavLink
      className={({ isActive }) => {
        return classNames(style.nav_button, className, {
          [style.nav_button_active]: isActive,
        });
      }}
      to={to}
      end={end}
    >
      {icon && <img className={style.icon} src={icon} alt={""} />}
      {children}
    </NavLink>
  );
};

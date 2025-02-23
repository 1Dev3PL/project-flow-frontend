import classNames from "classnames";
import style from "./Button.module.scss";
import { CircularProgress } from "@mui/material";

interface Props {
  className?: string;
  onClick?: () => void;
  variant?: "outlined" | "contained" | "glass";
  children?: string;
  type?: "submit" | "button";
  icon?: string;
  loading?: boolean;
}

export const Button = (props: Props) => {
  const {
    className,
    onClick,
    children,
    variant = "contained",
    type = "button",
    icon,
    loading,
  } = props;

  return (
    <button
      className={classNames(style.button, className, {
        [style.button_outlined]: variant == "outlined",
        [style.button_contained]: variant == "contained",
        [style.button_glass]: variant == "glass",
        [style.button_with_icon]: !!icon,
      })}
      onClick={onClick}
      type={type}
      disabled={loading}
    >
      {loading ? (
        <CircularProgress size={"1em"} color={"inherit"} />
      ) : (
        <>
          {icon && <img className={style.icon} src={icon} alt={""} />}
          <span>{children}</span>
        </>
      )}
    </button>
  );
};

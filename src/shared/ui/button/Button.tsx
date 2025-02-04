import classNames from "classnames";
import style from "./Button.module.scss";

interface Props {
  className?: string;
  onClick?: () => void;
  variant?: "outlined" | "contained" | "glass";
  children?: string;
  type?: "submit" | "button";
}

export const Button = (props: Props) => {
  const {
    className,
    onClick,
    children,
    variant = "contained",
    type = "button",
  } = props;

  return (
    <button
      className={classNames(style.button, className, {
        [style.button_outlined]: variant == "outlined",
        [style.button_contained]: variant == "contained",
        [style.button_glass]: variant == "glass",
      })}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

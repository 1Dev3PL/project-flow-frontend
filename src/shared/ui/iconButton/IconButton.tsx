import style from "./IconButton.module.scss";
import classNames from "classnames";

interface Props {
  className?: string;
  onClick?: () => void;
  icon: string;
  alt?: string;
}

export const IconButton = (props: Props) => {
  const { className, onClick, icon, alt = "" } = props;
  return (
    <button
      className={classNames(style.icon_button, className)}
      onClick={onClick}
    >
      <img className={style.icon} src={icon} alt={alt} />
    </button>
  );
};

import style from "./PageTitle.module.scss";
import classNames from "classnames";

interface Props {
  children: string;
  className?: string;
}

export const PageTitle = (props: Props) => {
  const { children, className } = props;

  return <h1 className={classNames(style.title, className)}>{children}</h1>;
};

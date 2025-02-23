import { ReactNode } from "react";
import style from "./PageTitle.module.scss";

export const PageTitle = ({ children }: { children: ReactNode }) => {
  return <h1 className={style.title}>{children}</h1>;
};

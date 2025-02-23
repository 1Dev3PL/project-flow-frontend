import { ReactNode } from "react";
import style from "./Page.module.scss";

export const Page = ({ children }: { children: ReactNode }) => {
  return <div className={style.page}>{children}</div>;
};

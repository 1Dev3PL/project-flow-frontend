import { Outlet } from "react-router";
import { Sidebar } from "widgets/sidebar";
import style from "./AppLayout.module.scss";

export const AppLayout = () => {
  return (
    <div className={style.page_layout}>
      <Sidebar />
      <Outlet />
    </div>
  );
};

import { Outlet } from "react-router";
import { Sidebar } from "widgets/sidebar";
import style from "./AppLayout.module.scss";
import { CurrentProjectLayout } from "app/layout/CurrentProjectLayout.tsx";

export const AppLayout = () => {
  return (
    <div className={style.page_layout}>
      <CurrentProjectLayout>
        <Sidebar />
        <Outlet />
      </CurrentProjectLayout>
    </div>
  );
};

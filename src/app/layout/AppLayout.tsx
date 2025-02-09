import { useUser } from "entities/user";
import { Outlet } from "react-router";
import { Sidebar } from "widgets/sidebar";
import style from "./AppLayout.module.scss"

export const AppLayout = () => {
  const { isError, isLoading } = useUser();

  if (isLoading || isError) return <>Loading...</>

  return (
    <div className={style.page_layout}>
      <Sidebar/>
      <Outlet />
    </div>
  );
};

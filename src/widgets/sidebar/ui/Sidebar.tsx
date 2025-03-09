import style from "./Sidebar.module.scss";
import logo from "shared/assets/images/logo.svg";
import { NavButton } from "shared/ui";
import dashboardIcon from "shared/assets/icons/dashboard.svg";
import tasksIcon from "shared/assets/icons/tasks.svg";
import usersIcon from "shared/assets/icons/users.png";
import folderIcon from "shared/assets/icons/folder.svg";
import { useCurrentProjectStore } from "shared/model/currentProject/currentProjectStore.ts";
import { CurrentProjectInfo } from "./CurrentProjectInfo.tsx";
import { UserInfo } from "./UserInfo";

export const Sidebar = () => {
  const currentProjectId = useCurrentProjectStore(
    (state) => state.currentProjectId,
  );

  return (
    <aside className={style.sidebar}>
      <div className={style.logo_container}>
        <img className={style.logo} src={logo} alt={"Logo"} />
      </div>
      <nav className={style.navigation}>
        {currentProjectId && (
          <>
            <NavButton
              to={`projects/${currentProjectId}/dashboard`}
              icon={dashboardIcon}
            >
              Доска
            </NavButton>
            <NavButton
              to={`projects/${currentProjectId}/tasks`}
              icon={tasksIcon}
            >
              Задачи
            </NavButton>
            <NavButton
              to={`projects/${currentProjectId}/users`}
              icon={usersIcon}
            >
              Пользователи
            </NavButton>
          </>
        )}
        <NavButton to={`projects`} icon={folderIcon} end>
          Все проекты
        </NavButton>
      </nav>
      <CurrentProjectInfo />
      <UserInfo />
    </aside>
  );
};

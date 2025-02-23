import style from "./Sidebar.module.scss";
import logo from "shared/assets/images/logo.svg";
import { NavButton } from "shared/ui/navButton";
import dashboardIcon from "shared/assets/icons/dashboard.svg";
import tasksIcon from "shared/assets/icons/tasks.svg";
import usersIcon from "shared/assets/icons/users.png";
import folderIcon from "shared/assets/icons/folder.svg";
import { UserInfo } from "features/userInfo";
import createIcon from "shared/assets/icons/add.svg";
import { useState } from "react";
import { CreateProjectModal } from "features/createProjectModal";
import { useParams } from "react-router";

export const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { projectId } = useParams();

  return (
    <aside className={style.sidebar}>
      <div className={style.logo_container}>
        <img className={style.logo} src={logo} alt={"Logo"} />
      </div>
      <nav className={style.navigation}>
        <NavButton to={`projects/${projectId}/dashboard`} icon={dashboardIcon}>
          Доска
        </NavButton>
        <NavButton to={`projects/${projectId}/tasks`} icon={tasksIcon}>
          Задачи
        </NavButton>
        <NavButton to={`projects/${projectId}/users`} icon={usersIcon}>
          Пользователи
        </NavButton>
        <NavButton to={`projects`} icon={folderIcon} end>
          Все проекты
        </NavButton>
      </nav>
      <button
        onClick={() => setOpen(true)}
        className={style.create_project_button}
      >
        <img className={style.icon} src={createIcon} alt={""} />
        Создать проект
      </button>
      <CreateProjectModal open={open} handleClose={() => setOpen(false)} />
      <UserInfo />
    </aside>
  );
};

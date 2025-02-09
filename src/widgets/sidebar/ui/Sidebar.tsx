import style from "./Sidebar.module.scss";
import logo from "shared/assets/images/logo.svg"
import { NavButton } from "shared/ui/navButton";
import dashboardIcon from "shared/assets/icons/dashboard.svg"
import tasksIcon from "shared/assets/icons/tasks.svg"
import usersIcon from "shared/assets/icons/users.png"
import { CreateProjectButton } from "features/createProjectButton";
import { UserInfo } from "features/userInfo";

export const Sidebar = () => {

  return (
    <aside className={style.sidebar}>
      <div className={style.logo_container}>
        <img className={style.logo} src={logo} alt={"Logo"}/>
      </div>
      <nav className={style.navigation}>
        <NavButton to={"/dashboard"} icon={dashboardIcon}>Доска</NavButton>
        <NavButton to={"/tasks"} icon={tasksIcon}>Задачи</NavButton>
        <NavButton to={"/users"} icon={usersIcon}>Пользователи</NavButton>
      </nav>
      <CreateProjectButton />
      <UserInfo />
    </aside>
  )
}
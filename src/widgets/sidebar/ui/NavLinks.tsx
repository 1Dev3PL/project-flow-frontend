import style from "./NavLinks.module.scss";
import { NavButton } from "shared/ui";
import dashboardIcon from "shared/assets/icons/dashboard.svg";
import tasksIcon from "shared/assets/icons/tasks.svg";
import usersIcon from "shared/assets/icons/users.png";
import folderIcon from "shared/assets/icons/folder.svg";
import { useCurrentProjectStore } from "shared/model/currentProject/currentProjectStore.ts";

interface Props {
  onSelect?: () => void;
}

export const NavLinks = (props: Props) => {
  const { onSelect } = props;
  const currentProjectId = useCurrentProjectStore(
    (state) => state.currentProjectId,
  );

  return (
    <div className={style.nav_group}>
      {currentProjectId && (
        <>
          <NavButton
            to={`projects/${currentProjectId}/dashboard`}
            icon={dashboardIcon}
            onClick={onSelect}
          >
            Доска
          </NavButton>
          <NavButton
            to={`projects/${currentProjectId}/tasks`}
            icon={tasksIcon}
            onClick={onSelect}
          >
            Задачи
          </NavButton>
          <NavButton
            to={`projects/${currentProjectId}/users`}
            icon={usersIcon}
            onClick={onSelect}
          >
            Пользователи
          </NavButton>
        </>
      )}
      <NavButton to={`projects`} icon={folderIcon} onClick={onSelect} end>
        Все проекты
      </NavButton>
    </div>
  );
};

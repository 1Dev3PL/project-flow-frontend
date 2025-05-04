import style from "./ProjectCard.module.scss";
import { Link } from "react-router";
import deleteIcon from "shared/assets/icons/delete.svg";
import editIcon from "shared/assets/icons/edit.svg";
import { EUserRole, useRole } from "entities/user";
import { IconButton } from "shared/ui";

interface Props {
  id: string;
  title: string;
  onDeleteClick: () => void;
  onEditClick: () => void;
}

export const ProjectCard = (props: Props) => {
  const { id, title, onDeleteClick, onEditClick } = props;
  const { role } = useRole(id);

  return (
    <div className={style.project_card}>
      <div className={style.card_header}>
        <Link to={`${id}/tasks`} key={id} className={style.link}>
          <p className={style.title} title={title}>
            {title}
          </p>
        </Link>
        {role == EUserRole.ADMIN && (
          <div className={style.buttons_group}>
            <IconButton icon={editIcon} alt={"edit"} onClick={onEditClick} />
            <IconButton
              icon={deleteIcon}
              alt={"delete"}
              onClick={onDeleteClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

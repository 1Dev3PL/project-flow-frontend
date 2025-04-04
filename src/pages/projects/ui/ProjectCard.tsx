import style from "./ProjectCard.module.scss";
import { Link } from "react-router";
import deleteIcon from "shared/assets/icons/delete.svg";
import editIcon from "shared/assets/icons/edit.svg";
import { EUserRole, useRole } from "entities/user";

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
            <button className={style.button} onClick={onEditClick}>
              <img
                className={style.icon}
                src={editIcon}
                alt={"edit"}
              />
            </button>
            <button className={style.button} onClick={onDeleteClick}>
              <img
                className={style.icon}
                src={deleteIcon}
                alt={"delete"}
              />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

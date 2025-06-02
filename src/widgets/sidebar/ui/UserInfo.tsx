import { Link } from "react-router";
import style from "./UserInfo.module.scss";
import { useAuth } from "entities/user";
import avatarDefault from "shared/assets/icons/avatar.svg";

interface Props {
  onClick?: () => void;
}

export const UserInfo = (props: Props) => {
  const { onClick } = props;
  const user = useAuth();

  return (
    <Link
      to={`/profile/${user.id}`}
      className={style.user_info}
      onClick={onClick}
    >
      <img className={style.avatar} src={avatarDefault} alt={""} />
      <span>{user.name}</span>
    </Link>
  );
};

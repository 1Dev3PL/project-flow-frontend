import { Link } from "react-router";
import style from "./UserInfo.module.scss";
import { useAuth } from "entities/user";
import avatarDefault from "shared/assets/icons/avatar.svg";

export const UserInfo = () => {
  const user = useAuth();

  return (
    <Link to={`/profile/${user.id}`} className={style.user_info}>
      <img className={style.avatar} src={avatarDefault} alt={""} />
      <span>{user.name}</span>
    </Link>
  );
};

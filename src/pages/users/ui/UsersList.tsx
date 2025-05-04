import style from "./UsersList.module.scss";
import avatar from "shared/assets/icons/avatar.svg";
import {
  EUserRole,
  useAuth,
  useProjectUsers,
  useRole,
  userRoleNames,
  userRoleSelectorOptions,
} from "entities/user";
import { Select } from "shared/ui";
import { ExcludeUserButton } from "features/excludeUser";
import { CircularProgress } from "@mui/material";
import { useInView } from "react-intersection-observer";
import { useCurrentProjectStore } from "shared/model/currentProject/currentProjectStore.ts";
import { useChangeRole } from "pages/users/hooks/useChangeRole.ts";

export const UsersList = () => {
  const authData = useAuth();
  const projectId = useCurrentProjectStore((state) => state.currentProjectId)!;
  const { role } = useRole(projectId);
  const {
    projectUsers,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useProjectUsers(projectId);
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
  });
  const { changeRoleMutation } = useChangeRole();

  const handleChangeUserRole = (role: EUserRole, userId: string) => {
    changeRoleMutation({ projectId, userId, roleData: { role } });
  };

  if (isLoading) {
    return (
      <div className={style.loader}>
        <CircularProgress color={"inherit"} />
      </div>
    );
  }

  return (
    <div className={style.users_list}>
      {projectUsers?.map((user) => (
        <div className={style.user} key={user.id}>
          <div className={style.avatar_container}>
            <img className={style.avatar} src={avatar} alt={""} />
          </div>
          <div>{user.name}</div>
          <div>{user.email}</div>
          {user.id == authData.id || role == EUserRole.DEVELOPER ? (
            <div>{userRoleNames[user.role]}</div>
          ) : (
            <>
              {role == EUserRole.ADMIN && (
                <>
                  <Select
                    options={userRoleSelectorOptions}
                    selected={user.role}
                    onChange={(role) => handleChangeUserRole(role, user.id)}
                  />
                  <ExcludeUserButton userId={user.id} />
                </>
              )}
            </>
          )}
        </div>
      ))}
      <div ref={ref} style={{ minHeight: "1px" }}>
        {isFetchingNextPage && <CircularProgress color={"inherit"} />}
      </div>
    </div>
  );
};

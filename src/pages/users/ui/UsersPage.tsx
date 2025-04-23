import { Page, PageTitle, Select } from "shared/ui";
import { CircularProgress } from "@mui/material";
import style from "./UsersPage.module.scss";
import { useCurrentProjectStore } from "shared/model/currentProject/currentProjectStore.ts";
import {
  EUserRole,
  useAuth,
  useRole,
  userRoleNames,
  userRoleSelectorOptions,
  useProjectUsers,
} from "entities/user";
import avatar from "shared/assets/icons/avatar.svg";
import { AddUserButton } from "features/addUser";
import { ExcludeUserButton } from "features/excludeUser";
import { useChangeRole } from "pages/users/hooks/useChangeRole.ts";
import { useInView } from "react-intersection-observer";

export const UsersPage = () => {
  const authData = useAuth();
  const projectId = useCurrentProjectStore((state) => state.currentProjectId)!;
  const { role } = useRole(projectId);
  const { projectUsers, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useProjectUsers(projectId);
  const { ref } = useInView({
    onChange: (inView) => {
      if (inView && hasNextPage && !isFetchingNextPage) fetchNextPage();
    },
  });
  const { changeRoleMutation } = useChangeRole();

  const handleChangeUserRole = (role: EUserRole, userId: string) => {
    changeRoleMutation({ projectId, userId, roleData: { role } });
  };

  const renderUsers = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <Page>
      <div className={style.header}>
        <PageTitle>Пользователи</PageTitle>
        <AddUserButton />
      </div>
      <div className={style.table}>
        <div className={style.table_header}>
          <div />
          <div>Имя</div>
          <div>Почта</div>
          <div>Роль</div>
          <div />
        </div>
        <div className={style.users_list}>
          {isLoading ? (
            <div>
              <CircularProgress color={"inherit"} />
            </div>
          ) : (
            renderUsers()
          )}
        </div>
      </div>
    </Page>
  );
};

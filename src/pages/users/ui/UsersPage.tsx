import { Page, PageTitle } from "shared/ui";
import style from "./UsersPage.module.scss";
import { AddUserButton } from "features/addUser";
import { UsersList } from "pages/users/ui/UsersList.tsx";

export const UsersPage = () => {
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
        <UsersList />
      </div>
    </Page>
  );
};

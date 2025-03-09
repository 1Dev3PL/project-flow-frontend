import { Page, PageTitle } from "shared/ui";
import style from "./DashboardPage.module.scss";
import { AddTaskButton } from "features/addTaskButton";

export const DashboardPage = () => {
  return (
    <Page>
      <div className={style.header}>
        <PageTitle>Доска</PageTitle>
        <AddTaskButton />
      </div>
    </Page>
  );
};

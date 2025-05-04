import { Page, PageTitle } from "shared/ui";
import style from "./DashboardPage.module.scss";
import { AddTaskButton } from "features/addTask";
import { Dashboard } from "pages/dashboard/ui/Dashboard.tsx";

export const DashboardPage = () => {
  return (
    <Page>
      <div className={style.header}>
        <PageTitle>Доска</PageTitle>
        <AddTaskButton />
      </div>
      <Dashboard />
    </Page>
  );
};

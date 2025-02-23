import { Page } from "shared/ui/page";
import { PageTitle } from "shared/ui/pageTitle";
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

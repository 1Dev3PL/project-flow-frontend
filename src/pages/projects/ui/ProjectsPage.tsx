import style from "./ProjectsPage.module.scss";
import { Link } from "react-router";
import { Page } from "shared/ui/page";
import { PageTitle } from "shared/ui/pageTitle";
import addBigIcon from "shared/assets/icons/addBig.svg";
import { useState } from "react";
import { CreateProjectModal } from "features/createProjectModal";
import { useProjects } from "entities/project";
import { useUser } from "entities/user";
import { CircularProgress } from "@mui/material";
import classNames from "classnames";

export const ProjectsPage = () => {
  const [open, setOpen] = useState(false);
  const user = useUser();
  const { projects, isLoading } = useProjects(user.id);

  const renderProjects = () => {
    return (
      <>
        {projects?.map((project) => (
          <Link to={`${project.id}/tasks`} key={project.id}>
            <div
              className={classNames(style.card, style.project_card)}
              key={project.id}
            >
              <p className={style.title}>{project.title}</p>
            </div>
          </Link>
        ))}
        <div
          className={classNames(style.card, style.add_project_card)}
          onClick={() => setOpen(true)}
        >
          <img src={addBigIcon} className={style.icon} alt={""} />
          <span>Создать проект</span>
        </div>
        <CreateProjectModal open={open} handleClose={() => setOpen(false)} />
      </>
    );
  };

  return (
    <Page>
      <PageTitle>Все проекты</PageTitle>
      <div className={style.content}>
        {isLoading ? (
          <div className={style.loader}>
            <CircularProgress color={"inherit"} />
          </div>
        ) : (
          renderProjects()
        )}
      </div>
    </Page>
  );
};

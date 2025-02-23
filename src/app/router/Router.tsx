import { createBrowserRouter } from "react-router";
import { SignUpPage } from "pages/signUp";
import { SignInPage } from "pages/login";
import { AppLayout } from "app/layout";
import { ProjectsPage } from "pages/projects";
import { TasksPage } from "pages/tasks";
import { DashboardPage } from "pages/dashboard";

export const router = createBrowserRouter([
  {
    path: "signup",
    element: <SignUpPage />,
  },
  {
    path: "login",
    element: <SignInPage />,
  },
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <></>,
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
      {
        path: "/projects/:projectId",
        children: [
          {
            path: "tasks",
            element: <TasksPage />,
          },
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "users",
            element: <></>,
          },
        ],
      },
      {
        path: "/profile/:userId",
        element: <></>,
      },
    ],
  },
]);

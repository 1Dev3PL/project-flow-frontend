import { createBrowserRouter } from "react-router";
import { SignUpPage } from "pages/signUp";
import { SignInPage } from "pages/login";
import { AppLayout } from "app/layout";
import { ProjectsPage } from "pages/projects";
import { TasksPage } from "pages/tasks";
import { DashboardPage } from "pages/dashboard";
import { UsersPage } from "pages/users";
import { ConfirmationPage } from "pages/confirmation";

export const router = createBrowserRouter([
  {
    path: "signup",
    element: <SignUpPage />,
  },
  {
    path: "confirmation",
    element: <ConfirmationPage />,
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
            element: <UsersPage />,
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

import { createBrowserRouter } from "react-router";
import { SignUpPage } from "pages/signUp";
import { SignInPage } from "pages/login";
import { AppLayout } from "app/layout";
import { ProjectsPage } from "pages/projects";

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
    ],
  },
]);

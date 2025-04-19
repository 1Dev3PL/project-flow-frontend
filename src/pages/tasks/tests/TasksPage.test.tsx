import nock from "nock";
import { render, screen, waitFor } from "@testing-library/react";
import { TasksPage } from "pages/tasks";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { expect } from "vitest";

describe("TasksPage", () => {
  it("no tasks renders correctly", async () => {
    nock("http://localhost:8081").get("/tasks").reply(200, []);
    nock("http://localhost:8081").get("/auth/data").reply(200, {
      id: "test",
      name: "Test User",
      email: "test@testing.com",
    });

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    render(
      <QueryClientProvider client={queryClient}>
        <TasksPage />
      </QueryClientProvider>,
    );

    await waitFor(() => screen.getByText("Нет задач"));

    expect(screen.getByText("Нет задач")).toBeInTheDocument();
  });
});

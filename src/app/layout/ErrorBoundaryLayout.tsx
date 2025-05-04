import { ErrorLayout } from "app/layout/ErrorLayout.tsx";
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router";

export const ErrorBoundaryLayout = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorLayout}>
      <Outlet />
    </ErrorBoundary>
  );
};

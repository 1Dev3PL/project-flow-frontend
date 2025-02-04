import { useUser } from "entities/user";
import { Navigate, Outlet } from "react-router";

export const AppLayout = () => {
  const { user, isError, isLoading, isFetching } = useUser();

  if (!user && isError) return <Navigate to={"/login"} replace />;

  if (isLoading || isFetching) return <>Loading...</>

  return <Outlet />;
};

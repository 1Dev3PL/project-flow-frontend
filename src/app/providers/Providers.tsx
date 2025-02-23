import { Suspense } from "react";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { router } from "app/router/Router.tsx";
import { RouterProvider } from "react-router";
import { AxiosError } from "axios";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      staleTime: 60 * 1000,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        router.navigate("/login", { replace: true });
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      const err = error as AxiosError;
      if (err.response?.status === 401) {
        router.navigate("/login", { replace: true });
      }
    },
  }),
});

export const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<>Loading...</>}>
        <RouterProvider router={router} />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position="bottom-right" reverseOrder={false} />
    </QueryClientProvider>
  );
};

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
import { Fallback } from "app/providers/Fallback.tsx";

const handleTokensExpired = (error: Error) => {
  const err = error as AxiosError;
  if (err.response?.status === 401) {
    router.navigate("/login", { replace: true });
  }
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      retryOnMount: false,
      staleTime: 60 * 1000,
    },
  },
  queryCache: new QueryCache({
    onError: handleTokensExpired,
  }),
  mutationCache: new MutationCache({
    onError: handleTokensExpired,
  }),
});

export const Providers = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Fallback />}>
        <RouterProvider router={router} />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster position="bottom-right" reverseOrder={false} />
    </QueryClientProvider>
  );
};

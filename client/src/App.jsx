import { RouterProvider } from "react-router";
import { router } from "./router/Router";
import AuthProvider from "./context/auth/AuthProvider";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { toast, Toaster } from "sonner";
import useFirstLoadGate from "./hooks/useFirstLoadGate";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (query.meta?.globalErrorToast === false) return;
      const message =
        error?.response?.data?.message ||
        (typeof error === "string" && error) ||
        error?.message ||
        "Something went wrong. Please try again.";
      toast.error(message);
    },
  }),
});

function App() {
  useFirstLoadGate();

  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster position="top-center" richColors />
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;

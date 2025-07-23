import { RouterProvider } from "react-router";
import { router } from "./router/Router";
import AuthProvider from "./context/auth/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        </QueryClientProvider>
      </AuthProvider>
    </>
  );
}

export default App;

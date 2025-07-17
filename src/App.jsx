import { RouterProvider } from "react-router";
import { router } from "./router/Router";
import AuthProvider from "./context/auth/AuthProvider";

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;

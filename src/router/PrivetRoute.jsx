import { AuthContext } from "@/context/auth/AuthContext";
import { Loader2 } from "lucide-react";
import { use } from "react";
import { Navigate } from "react-router";

const PrivetRoute = ({ children }) => {
  const { loading, user } = use(AuthContext);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-black" />
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivetRoute;

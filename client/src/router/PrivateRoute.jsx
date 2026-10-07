import { AuthContext } from "@/context/auth/AuthContext";
import LoadingScreen from "@/components/shared/LoadingScreen/LoadingScreen";
import { useAuth } from "@/hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import { useEffect } from "react";

const PrivateRoute = ({ children }) => {
  const { loading, user, setStateData } = useAuth();
  const location = useLocation();
  useEffect(() => {
    setStateData(location.pathname);
  }, []);

  if (loading) {
    return <LoadingScreen isLoading={true} />;
  }
  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    );
  }
  return children;
};

export default PrivateRoute;

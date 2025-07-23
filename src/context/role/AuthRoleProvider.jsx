import { useEffect, useState } from "react";
import axios from "axios";
import { AuthRoleContext } from "./AuthRoleContext";

export const AuthRoleProvider = ({ user, children }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchUserRole = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/users/role", {
          params: { uid: user.uid },
        });
        setRole(res.data.role);
      } catch (err) {
        console.error("Failed to fetch user role:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, [user?.uid]);

  return (
    <AuthRoleContext.Provider value={{ role, loading }}>
      {children}
    </AuthRoleContext.Provider>
  );
};

import { AuthContext } from "@/context/auth/AuthContext";
import { use } from "react";

export const useAuth = () => use(AuthContext);

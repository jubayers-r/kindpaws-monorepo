import { AuthRoleContext } from "@/context/role/AuthRoleContext";
import { use } from "react";

export const useAuthRole = () => use(AuthRoleContext);
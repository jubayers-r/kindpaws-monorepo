import PetsTable from "@/components/dashboard/PetsTable/PetsTable";
import { useAuth } from "@/hooks/useAuth";
import { useAuthRole } from "@/hooks/useAuthRole";
import React from "react";

const AllPetsTable = () => {
  const { user } = useAuth();
  const { role } = useAuthRole();
  return (
    <div>
      <PetsTable user={user} role={role} />
    </div>
  );
};

export default AllPetsTable;

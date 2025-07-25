import React from "react";
import AllPetsTable from "../../Admin/AllPetsTable/AllPetsTable";
import PetsTable from "@/components/dashboard/PetsTable/PetsTable";
import { useAuth } from "@/hooks/useAuth";
import { useAuthRole } from "@/hooks/useAuthRole";

const MyAddedPets = () => {
  const { user } = useAuth();
  const { role } = useAuthRole();

  return (
    <div>
      <PetsTable user={user} role={role} />
    </div>
  );
};

export default MyAddedPets;

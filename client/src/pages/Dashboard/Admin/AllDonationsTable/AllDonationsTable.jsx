import React from "react";
import DonationsTable from "../../../../components/dashboard/DonationTable/DonationsTable";
import { useAuth } from "@/hooks/useAuth";
import { useAuthRole } from "@/hooks/useAuthRole";

const AllDonationsTable = () => {
  const { user } = useAuth();
  const { role } = useAuthRole();

  return (
    <div>
      <DonationsTable user={user} role={role} />
    </div>
  );
};

export default AllDonationsTable;

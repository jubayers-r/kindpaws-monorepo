import { useAuth } from "@/hooks/useAuth";
import { useAuthRole } from "@/hooks/useAuthRole";
import DonationsTable from "../../../../components/dashboard/DonationTable/DonationsTable";

const MyDonationCampaigns = () => {
  const { user } = useAuth();
  const { role } = useAuthRole();

  return (
    <div>
      <DonationsTable user={user} role={role} />
    </div>
  );
};

export default MyDonationCampaigns;

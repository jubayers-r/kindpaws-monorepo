import ManagementQuickLinks from "@/components/dashboard/ManagementQuickLinks";
import OverviewMetrics from "@/components/dashboard/OverviewMatrics/OverviewMatrics";
import RecentActivity from "@/components/dashboard/RecentActivity/RecentActivity";
import TagCloud from "@/components/dashboard/TagCloud";

const Dashboard = () => {

  return (
   <div className="p-6 space-y-6">
      <OverviewMetrics />
      <RecentActivity/>
      <ManagementQuickLinks/>
      <TagCloud/>
    </div>
  );
};

export default Dashboard;

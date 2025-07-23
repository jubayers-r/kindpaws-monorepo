import ManagementQuickLinks from "@/components/dashboard/ManagementQuickLinks/ManagementQuickLinks";
import OverviewMetrics from "@/components/dashboard/OverviewMatrics/OverviewMatrics";
import RecentActivity from "@/components/dashboard/RecentActivity/RecentActivity";
import TagCloud from "@/components/dashboard/TagCloud/TagCloud";

const AdminOverview = () => {
  return (
    <>
      <OverviewMetrics />
      <RecentActivity />
      <ManagementQuickLinks />
      <TagCloud />
    </>
  );
};

export default AdminOverview;

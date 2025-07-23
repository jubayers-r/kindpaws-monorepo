import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import { Users, PawPrint, HandCoins, HeartHandshake } from "lucide-react";

const metricsIcons = {
  users: <Users className="w-6 h-6 text-primary" />,
  campaigns: <PawPrint className="w-6 h-6 text-primary" />,
  donations: <HandCoins className="w-6 h-6 text-primary" />,
  adoptions: <HeartHandshake className="w-6 h-6 text-primary" />,
};

// Mock API fetch — replace with real API call later
const fetchOverviewMetrics = async () => {
  return {
    users: 320,
    campaigns: 18,
    donations: 1275,
    adoptions: 44,
  };
};

const OverviewMetrics = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-metrics"],
    queryFn: fetchOverviewMetrics,
  });

  const metrics = [
    { id: "users", title: "Total Users", value: data?.users ?? 0 },
    { id: "campaigns", title: "Total Campaigns", value: data?.campaigns ?? 0 },
    { id: "donations", title: "Total Donations", value: data?.donations ?? 0 },
    { id: "adoptions", title: "Total Adoptions", value: data?.adoptions ?? 0 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {metrics.map((metric) => (
        <Card key={metric.id} className="shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            {metricsIcons[metric.id]}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? "..." : metric.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
};

export default OverviewMetrics;

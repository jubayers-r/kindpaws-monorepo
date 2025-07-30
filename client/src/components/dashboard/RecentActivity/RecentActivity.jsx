import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const fetchRecentActivity = async () => {
  // Replace this with your real API later
  return [
    {
      id: 1,
      type: "User Signup",
      user: "Emily Watson",
      time: "2 mins ago",
    },
    {
      id: 2,
      type: "New Campaign",
      user: "David Kim",
      time: "10 mins ago",
    },
    {
      id: 3,
      type: "Pet Adopted",
      user: "Sarah Lee",
      time: "1 hour ago",
    },
    {
      id: 4,
      type: "Donation Received",
      user: "Mark Brown",
      time: "3 hours ago",
    },
  ];
};

const RecentActivity = () => {
  const { data = [], isLoading } = useQuery({
    queryKey: ["recent-activity"],
    queryFn: fetchRecentActivity,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="divide-y">
            {(isLoading ? Array(4).fill(null) : data).map((item, idx) => (
              <li key={item?.id || idx} className="py-3 flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>
                    {item?.user?.slice(0, 2).toUpperCase() || "??"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {item?.type || "Loading..."}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item?.user || "Fetching user..."}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {item?.time || "..."}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RecentActivity;

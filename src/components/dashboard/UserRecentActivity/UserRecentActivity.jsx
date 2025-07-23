import { motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";



const UserRecentActivity = () => {
  const fetchUserOverview = async () => {
    // Replace with real API call with user context/auth
    return {
      user: {
        name: "Jubayer",
        email: "jubayer@example.com",
        image: "", // user image URL or empty string
      },
      petsCount: 5,
      donationsMade: 3,
      activeAdoptions: 1,
      campaignsCreated: 2,
      recentActivity: [
        {
          id: 1,
          type: "Pet Added",
          description: "Added a new dog named Max",
          time: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 mins ago
        },
        {
          id: 2,
          type: "Donation",
          description: "Donated $50 to Campaign XYZ",
          time: new Date(Date.now() - 60 * 60 * 1000).toISOString(), // 1 hour ago
        },
        {
          id: 3,
          type: "Adoption Request",
          description: "Requested adoption for Bella",
          time: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
        },
      ],
    };
  };

  const { data } = useQuery({
    queryKey: ["userOverview"],
    queryFn: fetchUserOverview,
  });

  const { recentActivity } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
    >
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {recentActivity.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No recent activity.
            </p>
          ) : (
            <ul className="divide-y">
              {recentActivity.map(({ id, type, description, time }) => (
                <li key={id} className="py-3">
                  <p className="font-medium">{type}</p>
                  <p className="text-sm text-muted-foreground">{description}</p>
                  <p className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(time), { addSuffix: true })}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserRecentActivity;

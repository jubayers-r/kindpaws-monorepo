import { motion } from "motion/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";

const UserInfo = () => {
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

  const { user } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4"
    >
      <Avatar className="w-16 h-16">
        {user.image ? (
          <AvatarImage src={user.image} alt={user.name} />
        ) : (
          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        )}
      </Avatar>
      <div>
        <h2 className="text-2xl font-semibold">Welcome, {user.name}!</h2>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>
    </motion.div>
  );
};

export default UserInfo;

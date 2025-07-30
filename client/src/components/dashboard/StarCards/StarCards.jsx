import { useQuery } from '@tanstack/react-query';
import { motion } from "motion/react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";

const StarCards = () => {



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

  const {
    petsCount,
    donationsMade,
    activeAdoptions,
    campaignsCreated,
  } = data;


    return (
         <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <Card className="text-center p-6">
          <CardTitle className="text-lg font-semibold">Your Pets</CardTitle>
          <CardContent>
            <p className="text-3xl font-bold">{petsCount}</p>
          </CardContent>
        </Card>

        <Card className="text-center p-6">
          <CardTitle className="text-lg font-semibold">
            Donations Made
          </CardTitle>
          <CardContent>
            <p className="text-3xl font-bold">{donationsMade}</p>
          </CardContent>
        </Card>

        <Card className="text-center p-6">
          <CardTitle className="text-lg font-semibold">
            Active Adoptions
          </CardTitle>
          <CardContent>
            <p className="text-3xl font-bold">{activeAdoptions}</p>
          </CardContent>
        </Card>

        <Card className="text-center p-6">
          <CardTitle className="text-lg font-semibold">
            Campaigns Created
          </CardTitle>
          <CardContent>
            <p className="text-3xl font-bold">{campaignsCreated}</p>
          </CardContent>
        </Card>
      </motion.div>
    );
};

export default StarCards;
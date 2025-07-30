import React from "react";
import { useQuery } from "@tanstack/react-query";
import UserInfo from "@/components/dashboard/UserInfo/UserInfo";
import StarCards from "@/components/dashboard/StarCards/StarCards";
import UserRecentActivity from "@/components/dashboard/UserRecentActivity/UserRecentActivity";
import CTA from "@/components/dashboard/CTA/CTA";

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

export default function UserOverview() {
  const { isLoading, error } = useQuery({
    queryKey: ["userOverview"],
    queryFn: fetchUserOverview,
  });

  if (isLoading) return <p>Loading user data...</p>;
  if (error) return <p>Failed to load user data.</p>;

  return (
    <div className="space-y-8 max-w-5xl mx-auto p-4">
      {/* User Info */}

      <UserInfo />
      {/* Stats Cards */}
      <StarCards />

      {/* Recent Activity */}
      <UserRecentActivity />
      {/* Call to Action Buttons */}
      <CTA />
    </div>
  );
}

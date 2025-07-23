import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import {
  CheckCircle2,
  XCircle,
  Megaphone,
  AlertTriangle,
  Users,
} from "lucide-react";

const fetchDashboardStats = async () => {
  // Mocked API delay
  return {
    adoptionRequests: 5,
    campaignsNeedingAttention: 2,
    flaggedReports: 3,
    adminUsersCount: 4,
  };
};

const MotionCard = motion(Card);

export default function ManagementQuickLinks() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: fetchDashboardStats,
  });

  if (isLoading) return <p>Loading dashboard stats...</p>;
  if (error) return <p>Error loading dashboard stats.</p>;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Adoption Requests */}
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="cursor-pointer"
      >
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <CheckCircle2 className="w-6 h-6 text-green-600" />
            Adoption Requests
          </CardTitle>
          <span className="text-sm font-medium text-gray-600">
            {data.adoptionRequests}
          </span>
        </CardHeader>
        <CardContent className="flex gap-3 mt-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => alert("Approve clicked")}
          >
            Approve
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={() => alert("Decline clicked")}
          >
            Decline
          </Button>
        </CardContent>
      </MotionCard>

      {/* Campaigns Needing Attention */}
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="cursor-pointer"
        onClick={() => alert("Navigate to campaigns")}
      >
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Megaphone className="w-6 h-6 text-yellow-600" />
            Campaigns Attention
          </CardTitle>
          <span className="text-sm font-medium text-gray-600">
            {data.campaignsNeedingAttention}
          </span>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">
            Campaigns low on funds or near deadline.
          </p>
        </CardContent>
      </MotionCard>

      {/* Flagged Reports */}
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="cursor-pointer"
        onClick={() => alert("View flagged reports")}
      >
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            Flagged Reports
          </CardTitle>
          <span className="text-sm font-medium text-gray-600">
            {data.flaggedReports}
          </span>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">
            Review reported content or users.
          </p>
        </CardContent>
      </MotionCard>

      {/* Manage Admins/Users */}
      <MotionCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="cursor-pointer"
        onClick={() => alert("Manage admins and users")}
      >
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Users className="w-6 h-6 text-blue-600" />
            Manage Admins/Users
          </CardTitle>
          <span className="text-sm font-medium text-gray-600">
            {data.adminUsersCount}
          </span>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">
            Manage access levels and roles.
          </p>
        </CardContent>
      </MotionCard>
    </section>
  );
}

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const fetchCategoryData = async () => {
  return {
    Dog: 44,
    Cat: 31,
    Bird: 8,
    Others: 17,
  };
};

// Colors for the pie slices — pick something professional and vibrant
const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];

const MotionCard = motion(Card);

export default function TagCloud() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["categoryData"],
    queryFn: fetchCategoryData,
  });

  if (isLoading) return <p>Loading categories...</p>;
  if (error) return <p>Error loading categories.</p>;

  // Convert data object to array for recharts
  const chartData = Object.entries(data).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <MotionCard
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-md mx-auto p-4"
    >
      <CardHeader>
        <CardTitle className="text-center">Pet Category Insights</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(0)}%`
              }
              animationDuration={600}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `${value}%`}
              contentStyle={{ fontSize: "14px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </MotionCard>
  );
}

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { useAuthRole } from "@/hooks/useAuthRole";

export default function ProfilePage() {
  const { user } = useAuth();
  const { role } = useAuthRole();

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-lg mx-auto p-6"
    >
      <Card className="shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <CardHeader className="text-center">
          <div className="flex justify-center">
            <img
              src={user.photoURL || "/placeholder.jpg"}
              alt={user.displayName}
              className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
            />
          </div>
          <CardTitle className="mt-4 text-2xl font-bold">
            {user.displayName || "No Name"}
          </CardTitle>
          <p className="text-muted-foreground">{user.email}</p>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-4">
          {/* Role */}
          <div className="flex items-center justify-between">
            <span className="font-medium">Role</span>
            <Badge variant={role === "admin" ? "destructive" : "default"}>{role}</Badge>
          </div>

          {/* Firebase Info */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Email Verified</span>
              <span>{user.emailVerified ? "Yes" : "No"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Phone</span>
              <span>{user.phoneNumber || "Not set"}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">User ID</span>
              <span className="break-all">{user.uid}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Created At</span>
              <span>{new Date(user.metadata.creationTime).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Last Sign In</span>
              <span>{new Date(user.metadata.lastSignInTime).toLocaleString()}</span>
            </div>
           
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

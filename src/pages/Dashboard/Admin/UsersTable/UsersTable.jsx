import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "motion/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";

export default function UserTable() {
  const authUser = useAuth().user;

  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
  });

  const makeAdminMutation = useMutation({
    mutationFn: async (userId) => {
      const res = await axios.patch(`http://localhost:8000/api/users/promote`, {}, {
        params: { uid: userId },
      });
      refetch();
      if (!res.ok) throw new Error("Failed to promote user");
      return res.json();
    },
    onSuccess: () => {
      toast.success("User promoted to admin");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Something went wrong while promoting");
    },
  });
  const makeUserMutation = useMutation({
    mutationFn: async (userId) => {
      const res = await axios.patch(`http://localhost:8000/api/users/demote`, {}, {
        params: { uid: userId },
      });
      refetch();
      if (!res.ok) throw new Error("Failed to demote user");
      return res.json();
    },
    onSuccess: () => {
      toast.success("User promoted to admin");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Something went wrong while promoting");
    },
  });

  const banUserMutation = useMutation({
    mutationFn: async (userId) => {
      const res = await axios.patch(`http://localhost:8000/api/users/ban`, {}, {
        params: { uid: userId },
      });
      refetch();
      if (!res.ok) throw new Error("Failed to ban user");
      return res.json();
    },
    onSuccess: () => {
      toast.success("User has been banned");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Failed to ban user");
    },
  });
  const unbanUserMutation = useMutation({
    mutationFn: async (userId) => {
      const res = await axios.patch(`http://localhost:8000/api/users/unban`, {}, {
        params: { uid: userId },
      });
      refetch();
      if (!res.ok) throw new Error("Failed to ban user");
      return res.json();
    },
    onSuccess: () => {
      toast.success("User has been banned");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Failed to ban user");
    },
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full overflow-x-auto"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[50px]">Profile</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {isLoading ? (
            [...Array(5)].map((_, i) => (
              <TableRow key={i}>
                {[...Array(6)].map((_, j) => (
                  <TableCell key={j}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : users.length > 0 ? (
            users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <img
                    src={user.image || "/placeholder.jpg"}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.role === "admin" ? "destructive" : "default"}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  {user.banned ? (
                    <Badge variant="destructive">Banned</Badge>
                  ) : (
                    <Badge variant="secondary">Active</Badge>
                  )}
                </TableCell>
                <TableCell className="flex gap-2">
                  {user.role !== "admin" && !user.banned && (
                    <Button
                      size="sm"
                      onClick={() => makeAdminMutation.mutate(user.uid)}
                      disabled={makeAdminMutation.isLoading}
                    >
                      Make Admin
                    </Button>
                  )}
                  {user.role === "admin" && user.uid !== authUser.uid && (
                    <Button
                      size="sm"
                      onClick={() => makeUserMutation.mutate(user.uid)}
                      disabled={makeUserMutation.isLoading}
                    >
                      Make User
                    </Button>
                  )}
                  {!user.banned && user.uid !== authUser.uid && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => banUserMutation.mutate(user.uid)}
                      disabled={banUserMutation.isLoading}
                    >
                      Ban
                    </Button>
                  )}
                  {user.banned && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => unbanUserMutation.mutate(user.uid)}
                      disabled={unbanUserMutation.isLoading}
                    >
                      Unban
                    </Button>
                  )}
                  {user.uid === authUser.uid && user.role === "admin" && (
                    <span className="text-black italic">You are an admin</span>
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-muted-foreground"
              >
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
}

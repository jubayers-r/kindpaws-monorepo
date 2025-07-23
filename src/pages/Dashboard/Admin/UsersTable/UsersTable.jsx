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

export default function UserTable() {
  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      return res.json();
    },
  });

  const makeAdminMutation = useMutation({
    mutationFn: async (userId) => {
      const res = await fetch(`/api/users/${userId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: "admin" }),
      });
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

  const banUserMutation = useMutation({
    mutationFn: async (userId) => {
      const res = await fetch(`/api/users/${userId}/ban`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ banned: true }),
      });
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
            <TableHead className="min-w-[200px]">Profile</TableHead>
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
                    src={user.photoURL || "/placeholder.jpg"}
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
                      onClick={() => makeAdminMutation.mutate(user._id)}
                      disabled={makeAdminMutation.isLoading}
                    >
                      Make Admin
                    </Button>
                  )}
                  {!user.banned && (
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => banUserMutation.mutate(user._id)}
                      disabled={banUserMutation.isLoading}
                    >
                      Ban
                    </Button>
                  )}
                  {user.banned && (
                    <span className="text-muted-foreground text-sm">
                      Banned
                    </span>
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

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
import { Pencil, Trash2, Pause, Play } from "lucide-react";

export default function AllDonationsTable() {
  const queryClient = useQueryClient();

  const { data: campaigns = [], isLoading } = useQuery({
    queryKey: ["allDonations"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/api/campaigns");
      if (!res.ok) throw new Error("Failed to fetch donation campaigns");
      return res.json();
    },
  });

  const deleteCampaign = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`/api/donations/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Campaign deleted");
      queryClient.invalidateQueries({ queryKey: ["allDonations"] });
    },
    onError: () => toast.error("Failed to delete"),
  });

  const togglePause = useMutation({
    mutationFn: async (campaign) => {
      const newPaused = !campaign.paused;
      const res = await fetch(`/api/donations/${campaign._id}/pause`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paused: newPaused }),
      });
      if (!res.ok) throw new Error("Toggle pause failed");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Campaign pause state updated");
      queryClient.invalidateQueries({ queryKey: ["allDonations"] });
    },
    onError: () => toast.error("Failed to update pause state"),
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
            <TableHead>Title</TableHead>
            <TableHead>Goal</TableHead>
            <TableHead>Raised</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead className="text-right">Actions</TableHead>
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
          ) : campaigns.length > 0 ? (
            campaigns.map((c) => (
              <TableRow key={c._id}>
                <TableCell className="font-medium">{c.title}</TableCell>
                <TableCell>${c.goal}</TableCell>
                <TableCell>${c.raised || 0}</TableCell>
                <TableCell>
                  <Badge variant={c.paused ? "destructive" : "default"}>
                    {c.paused ? "Paused" : "Active"}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm font-medium">
                    {c.owner?.name || "N/A"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {c.owner?.email}
                  </div>
                </TableCell>
                <TableCell className="flex justify-end gap-2 flex-wrap">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => togglePause.mutate(c)}
                  >
                    {c.paused ? (
                      <>
                        <Play className="w-4 h-4 mr-1" />
                        Unpause
                      </>
                    ) : (
                      <>
                        <Pause className="w-4 h-4 mr-1" />
                        Pause
                      </>
                    )}
                  </Button>

                  <Button
                    size="sm"
                    onClick={() => console.log("Edit modal:", c._id)}
                  >
                    <Pencil className="w-4 h-4 mr-1" /> Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteCampaign.mutate(c._id)}
                  >
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={6}
                className="text-center text-muted-foreground"
              >
                No donation campaigns found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
}

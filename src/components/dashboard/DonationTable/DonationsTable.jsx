import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "motion/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Pencil, Trash2, Pause, Play } from "lucide-react";
import { useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Link } from "react-router";

export default function DonationsTable({ user, role }) {
  const isAdmin = role === "admin";
  const [filter, setFilter] = useState("all");
  const [ownerFilter, setOwnerFilter] = useState("");

  const {
    data: campaigns = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allDonations"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/api/campaigns");
      if (!res.ok) throw new Error("Failed to fetch donation campaigns");
      return res.json();
    },
  });

  const deleteCampaign = useMutation({
    mutationFn: async (campaignId) =>
      await axios.delete("http://localhost:8000/api/campaigns/delete", {
        params: { id: campaignId },
      }),
    onSuccess: () => {
      refetch();
      toast.success("Campaign deleted successfully");
    },
    onError: () => toast.error("Failed to delete campaign"),
  });

  const togglePause = useMutation({
    mutationFn: async (campaignId) =>
      await axios.patch("http://localhost:8000/api/campaigns/statusToggle", {}, {
        params: { id: campaignId },
      }),
    onSuccess: () => {
      toast.success("Campaign status updated");
      refetch();
    },
    onError: () => toast.error("Failed to update campaign status"),
  });

  const filteredCampaigns = campaigns
    .filter((c) => (isAdmin || c?.ownerId === user?.uid))
    .filter((c) => {
      if (filter === "active" && !c.isOpen) return false;
      if (filter === "paused" && c.isOpen) return false;
      if (ownerFilter && !c.ownerName?.toLowerCase().includes(ownerFilter.toLowerCase()))
        return false;
      return true;
    });

  const confirmDelete = (c) => {
    const ok = window.confirm(`Are you sure you want to delete "${c.title}"?`);
    if (ok) deleteCampaign.mutate(c._id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      <div className="flex flex-wrap gap-4 mb-6 items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          {["all", "active", "paused"].map((val) => (
            <Button
              key={val}
              variant={filter === val ? "default" : "outline"}
              onClick={() => setFilter(val)}
            >
              {val.charAt(0).toUpperCase() + val.slice(1)}
            </Button>
          ))}
        </div>
        {isAdmin && (
          <Input
            placeholder="Filter by owner name"
            value={ownerFilter}
            onChange={(e) => setOwnerFilter(e.target.value)}
            className="max-w-xs"
          />
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <Table className="w-full border border-gray-200 rounded-md">
          <TableHeader className="sticky top-0 bg-white z-10">
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Goal</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Status</TableHead>
              {isAdmin && <TableHead>Owner</TableHead>}
              <TableHead className="text-left">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(isAdmin ? 6 : 5)].map((_, j) => (
                    <TableCell key={j} className="p-3">
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((c) => {
                const progress = Math.min(100, Math.round((c.collectedAmount / c.goalAmount) * 100));
                return (
                  <TableRow key={c._id}>
                    <TableCell className="font-medium">{c.title}</TableCell>
                    <TableCell>${c.goalAmount}</TableCell>
                    <TableCell>
                      <Progress value={progress} className="h-2" />
                      <span className="text-xs text-gray-500 block mt-1">
                        ${c.collectedAmount} raised ({progress}%)
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant={!c.isOpen ? "destructive" : "default"}>
                        {c.isOpen ? "Active" : "Paused"}
                      </Badge>
                    </TableCell>
                    {isAdmin && (
                      <TableCell>
                        <div className="text-sm font-medium">{c.ownerName || "N/A"}</div>
                      </TableCell>
                    )}
                    <TableCell className="space-x-2 whitespace-nowrap">
                      <Button size="sm" variant="outline" onClick={() => togglePause.mutate(c._id)}>
                        {c.isOpen ? <><Pause className="w-4 h-4 mr-1" /> Pause</> : <><Play className="w-4 h-4 mr-1" /> Unpause</>}
                      </Button>
                      <Link to={`/dashboard/update-campaign/${c._id}`}>
                        <Button size="sm"><Pencil className="w-4 h-4 mr-1" /> Edit</Button>
                      </Link>
                      <Button size="sm" variant="destructive" onClick={() => confirmDelete(c)}>
                        <Trash2 className="w-4 h-4 mr-1" /> Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No campaigns found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4">
        {isLoading ? (
          [...Array(4)].map((_, i) => (
            <div key={i} className="p-4 border rounded shadow-sm bg-white space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-2 w-1/2" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))
        ) : filteredCampaigns.length > 0 ? (
          filteredCampaigns.map((c) => {
            const progress = Math.min(100, Math.round((c.collectedAmount / c.goalAmount) * 100));
            return (
              <motion.div
                key={c._id}
                className="p-4 rounded border shadow-sm bg-white space-y-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <div className="text-sm text-gray-500">${c.goalAmount} goal</div>
                <Progress value={progress} className="h-2 mt-1" />
                <div className="text-xs text-gray-500">
                  ${c.collectedAmount} raised ({progress}%)
                </div>
                <Badge variant={c.isOpen ? "default" : "destructive"}>
                  {c.isOpen ? "Active" : "Paused"}
                </Badge>
                {isAdmin && (
                  <div className="text-sm text-gray-600">By: {c.ownerName || "N/A"}</div>
                )}
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => togglePause.mutate(c._id)}
                  >
                    {c.isOpen ? <><Pause className="w-4 h-4 mr-1" /> Pause</> : <><Play className="w-4 h-4 mr-1" /> Unpause</>}
                  </Button>
                  <Link to={`/dashboard/update-campaign/${c._id}`}>
                    <Button size="sm"><Pencil className="w-4 h-4 mr-1" /> Edit</Button>
                  </Link>
                  <Button size="sm" variant="destructive" onClick={() => confirmDelete(c)}>
                    <Trash2 className="w-4 h-4 mr-1" /> Delete
                  </Button>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="text-center text-muted-foreground">No campaigns found.</div>
        )}
      </div>
    </motion.div>
  );
}

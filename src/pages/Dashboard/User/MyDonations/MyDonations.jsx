import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion } from "motion/react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";

const MyDonations = () => {
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const { data: donations, isLoading } = useQuery({
    queryKey: ["my-donations"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:8000/api/campaigns/my", {
        params: { id: user.uid },
      });
      return res.data;
    },
  });

  const refundMutation = useMutation({
    mutationFn: async (id) => {
      await axios.patch(`http://localhost:8000/api/campaigns/refund/${id}`);
    },
    onSuccess: () => {
      toast.success("Refund processed");
      queryClient.invalidateQueries(["my-donations"]);
    },
    onError: () => toast.error("Refund failed"),
  });

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-20 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!donations?.length) {
    return (
      <p className="text-center text-muted-foreground mt-10">
        You haven't made any donations yet.
      </p>
    );
  }

  return (
    <motion.div
      className="p-6 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-6 text-center">My Donations</h2>

      <Card className="overflow-x-auto">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Pet</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {donations.map((donation) => (
                <TableRow key={donation._id} className="hover:bg-muted">
                  <TableCell>
                    <img
                      src={donation.campaignSnapshot.image}
                      alt="Pet"
                      className="h-16 w-16 rounded-xl object-cover"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">
                      {donation.campaignSnapshot.petName}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {donation.campaignSnapshot.title}
                    </div>
                  </TableCell>
                  <TableCell>${donation.amount}</TableCell>
                  <TableCell>
                    {new Date(donation.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </TableCell>
                  <TableCell>
                    {donation.isRefunded ? (
                      <Badge variant="destructive">Refunded</Badge>
                    ) : (
                      <Badge variant="success">Success</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={donation.isRefunded}
                      onClick={() => refundMutation.mutate(donation._id)}
                    >
                      Ask for Refund
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MyDonations;

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
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { motion } from "framer-motion";
import axios from "axios";

const MyDonations = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: donations, isLoading } = useQuery({
    queryKey: ["my-donations"],
    queryFn: async () => {
      const res = await axios.get(
        "https://kind-paws.vercel.app/api/campaigns/my",
        {
          params: { id: user.uid },
        }
      );
      return res.data;
    },
  });

  const refundMutation = useMutation({
    mutationFn: async (id) => {
      await axios.patch(
        `https://kind-paws.vercel.app/api/campaigns/refund/${id}`
      );
    },
    onSuccess: () => {
      toast.success("Refund processed");
      queryClient.invalidateQueries(["my-donations"]);
    },
    onError: () => toast.error("Refund failed"),
  });

  if (isLoading) {
    return (
      <div className="p-6 space-y-4 max-w-4xl mx-auto">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!donations?.length) {
    return (
      <motion.p
        className="text-center text-muted-foreground mt-10 dark:text-primary-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        You haven't made any donations yet.
      </motion.p>
    );
  }

  return (
    <motion.div
      className="p-4 sm:p-6 max-w-6xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        My Donations
      </h2>

      {/* Desktop Table */}
      <div className="hidden md:block">
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
                      {new Date(donation.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
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
                        disabled={
                          donation.isRefunded || refundMutation.isPending
                        }
                        onClick={() => {
                          if (confirm("Are you sure you want a refund?")) {
                            refundMutation.mutate(donation._id);
                          }
                        }}
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
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {donations.map((donation) => (
          <Card key={donation._id}>
            <CardContent className="p-4 flex gap-4">
              <img
                src={donation.campaignSnapshot.image}
                alt="Pet"
                className="h-20 w-20 rounded-lg object-cover"
              />
              <div className="flex-1 space-y-1">
                <div className="font-semibold text-lg">
                  {donation.campaignSnapshot.petName}
                </div>
                <p className="text-sm text-muted-foreground">
                  {donation.campaignSnapshot.title}
                </p>
                <p className="text-sm">
                  <strong>Amount:</strong> ${donation.amount}
                </p>
                <p className="text-sm">
                  <strong>Date:</strong>{" "}
                  {new Date(donation.createdAt).toLocaleDateString()}
                </p>
                <div className="flex items-center justify-between mt-2">
                  {donation.isRefunded ? (
                    <Badge variant="destructive">Refunded</Badge>
                  ) : (
                    <Badge variant="success">Success</Badge>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-2"
                    disabled={donation.isRefunded || refundMutation.isPending}
                    onClick={() => {
                      if (confirm("Are you sure you want a refund?")) {
                        refundMutation.mutate(donation._id);
                      }
                    }}
                  >
                    Refund
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};

export default MyDonations;

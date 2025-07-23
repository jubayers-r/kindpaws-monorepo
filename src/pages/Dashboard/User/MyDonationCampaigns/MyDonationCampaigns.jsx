import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

const mockCampaigns = [
  {
    id: "1",
    petName: "Luna",
    maxAmount: 5000,
    receivedAmount: 2600,
    isPaused: false,
    donators: [
      { name: "Alice", amount: 1000 },
      { name: "Bob", amount: 1600 },
    ],
  },
  {
    id: "2",
    petName: "Max",
    maxAmount: 8000,
    receivedAmount: 8000,
    isPaused: true,
    donators: [
      { name: "Jane", amount: 3000 },
      { name: "Tom", amount: 5000 },
    ],
  },
];

const MyDonationCampaigns = () => {
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [modalCampaign, setModalCampaign] = useState(null);

  const togglePause = (id) => {
    setCampaigns((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, isPaused: !c.isPaused } : c
      )
    );
    toast.success("Campaign status updated.");
  };

  const openModal = (campaign) => setModalCampaign(campaign);
  const closeModal = () => setModalCampaign(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto px-4 py-8"
    >
      <h2 className="text-3xl font-semibold mb-6">My Donation Campaigns</h2>

      {campaigns.length === 0 ? (
        <p className="text-gray-500 text-center">No campaigns yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-md">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Pet Name</th>
                <th className="p-3">Max Donation</th>
                <th className="p-3">Progress</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map((campaign) => {
                const progress = Math.min(
                  (campaign.receivedAmount / campaign.maxAmount) * 100,
                  100
                );

                return (
                  <tr key={campaign.id} className="border-t">
                    <td className="p-3">{campaign.petName}</td>
                    <td className="p-3">৳{campaign.maxAmount}</td>
                    <td className="p-3">
                      <div className="flex flex-col gap-1">
                        <Progress value={progress} className="h-2" />
                        <span className="text-xs text-gray-500">
                          ৳{campaign.receivedAmount} raised ({progress.toFixed(1)}%)
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 text-xs rounded text-white ${
                          campaign.isPaused ? "bg-yellow-500" : "bg-green-600"
                        }`}
                      >
                        {campaign.isPaused ? "Paused" : "Active"}
                      </span>
                    </td>
                    <td className="p-3 space-x-2 whitespace-nowrap">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => togglePause(campaign.id)}
                      >
                        {campaign.isPaused ? "Unpause" : "Pause"}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => {
                          // 🟡 Replace with your router logic
                          window.location.href = `/dashboard/edit-donation/${campaign.id}`;
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => openModal(campaign)}
                      >
                        View Donators
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      <Dialog open={!!modalCampaign} onOpenChange={closeModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Donators for {modalCampaign?.petName}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 mt-4">
            {modalCampaign?.donators?.length > 0 ? (
              modalCampaign.donators.map((d, i) => (
                <div
                  key={i}
                  className="flex justify-between border-b pb-2 text-sm"
                >
                  <span>{d.name}</span>
                  <span className="font-medium">৳{d.amount}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No donators yet.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default MyDonationCampaigns;

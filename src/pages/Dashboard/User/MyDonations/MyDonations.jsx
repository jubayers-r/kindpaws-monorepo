import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const mockDonations = [
  {
    id: "don1",
    petName: "Milo",
    petImage: "https://placekitten.com/80/80",
    amount: 1000,
  },
  {
    id: "don2",
    petName: "Bella",
    petImage: "https://placekitten.com/81/81",
    amount: 1500,
  },
];

const MyDonations = () => {
  const [donations, setDonations] = useState(mockDonations);

  const handleRefund = (id) => {
    const confirmed = confirm("Are you sure you want to request a refund?");
    if (!confirmed) return;

    // Simulate refund by removing from mock state (replace with mutation)
    setDonations((prev) => prev.filter((donation) => donation.id !== id));
    toast.success("Refund requested successfully.");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto px-4 py-8"
    >
      <h2 className="text-3xl font-semibold mb-6">My Donations</h2>

      {donations.length === 0 ? (
        <p className="text-center text-gray-500">You haven’t donated yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-md text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3">Pet</th>
                <th className="p-3">Name</th>
                <th className="p-3">Amount Donated</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation) => (
                <tr key={donation.id} className="border-t">
                  <td className="p-3">
                    <img
                      src={donation.petImage}
                      alt={donation.petName}
                      className="w-14 h-14 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-3 font-medium">{donation.petName}</td>
                  <td className="p-3">৳{donation.amount}</td>
                  <td className="p-3">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRefund(donation.id)}
                    >
                      Ask for Refund
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default MyDonations;

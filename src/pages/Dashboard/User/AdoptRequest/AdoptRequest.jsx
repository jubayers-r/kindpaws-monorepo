import { useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";

// const mockRequests = [
//   {
//     id: "1",
//     petName: "Charlie",
//     adopter: {
//       name: "John Doe",
//       email: "john@example.com",
//       phone: "0123456789",
//       location: "Dhaka",
//     },
//     status: "pending",
//   },
//   {
//     id: "2",
//     petName: "Mittens",
//     adopter: {
//       name: "Jane Smith",
//       email: "jane@example.com",
//       phone: "0198765432",
//       location: "Chattogram",
//     },
//     status: "pending",
//   },
// ];

const AdoptionRequests = () => {
  const { user } = useAuth();
  // Replace mockRequests with:
  const {
    data: requests,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["adoption-requests"],
    queryFn: () =>
      fetch("http://localhost:8000/api/pets/adoption-requests").then((res) =>
        res.json()
      ),
  });

  const mutation = useMutation({
    mutationFn: async ({ id, action }) => {
      const res = await axios.patch(
        "http://localhost:8000/api/pets/adoption-requests",
        { status: action },
        { params: { id } }
      );
      return res.data;
    },
    onSuccess: (_data, variables) => {
      refetch();
      toast.success(
        `Request ${variables.action === "Approved" ? "accepted" : "rejected"}!`
      );
    },
    onError: (error) => {
      toast.error("Something went wrong. Please try again.");
      console.error(error);
    },
  });

  const handleAction = (id, action) => {
    mutation.mutate({ id, action });
  };

  // Your UI would use `requests`, `isLoading`, and `handleAction`
  // Example:
  // requests.map(r => <button onClick={() => handleAction(r.id, "Approved")}>Approve</button>)

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-primary" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <h2 className="text-3xl font-semibold mb-6">Adoption Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500 text-center">No adoption requests yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-md overflow-hidden">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">Pet Name</th>
                <th className="p-3">Adopter Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Location</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((req) => (
                <tr key={req.id} className="border-t">
                  <td className="p-3">{req.petName}</td>
                  <td className="p-3">{req.userName}</td>
                  <td className="p-3">{req.userEmail}</td>
                  <td className="p-3">{req.phone}</td>
                  <td className="p-3">{req.address}</td>
                  <td className="p-3 capitalize">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        req.isAdopted === "accepted"
                          ? "bg-green-500"
                          : req.isAdopted === "rejected"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="p-3 space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={req.status !== "Pending" }
                      onClick={() => handleAction(req._id, "Approved")}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={req.status !== "Pending"}
                      onClick={() => handleAction(req._id, "Rejected")}
                    >
                      Reject
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

export default AdoptionRequests;

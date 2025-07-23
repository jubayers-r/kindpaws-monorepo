import { useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const mockRequests = [
  {
    id: "1",
    petName: "Charlie",
    adopter: {
      name: "John Doe",
      email: "john@example.com",
      phone: "0123456789",
      location: "Dhaka",
    },
    status: "pending",
  },
  {
    id: "2",
    petName: "Mittens",
    adopter: {
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "0198765432",
      location: "Chattogram",
    },
    status: "pending",
  },
];

const AdoptionRequests = () => {
  // Replace mockRequests with:
//   const { data: requests, isLoading } = useQuery({
//     queryKey: ["adoption-requests"],
//     queryFn: () => fetch("/api/adoption-requests").then((res) => res.json()),
//   });

//   const mutation = useMutation({
//     mutationFn: ({ id, action }) =>
//       fetch(`/api/adoption-requests/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: action }),
//       }),
//     onSuccess: () => {
//       queryClient.invalidateQueries(["adoption-requests"]);
//     },
//   });
  const [requests, setRequests] = useState(mockRequests);


  const handleAction = (id, action) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r))
    );
    toast.success(
      `Request ${action === "accepted" ? "accepted" : "rejected"}!`
    );
    // 🟡 Replace this later with:
    // mutation.mutate({ id, action });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto px-4 py-8"
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
                  <td className="p-3">{req.adopter.name}</td>
                  <td className="p-3">{req.adopter.email}</td>
                  <td className="p-3">{req.adopter.phone}</td>
                  <td className="p-3">{req.adopter.location}</td>
                  <td className="p-3 capitalize">
                    <span
                      className={`px-2 py-1 rounded text-white text-xs ${
                        req.status === "accepted"
                          ? "bg-green-500"
                          : req.status === "rejected"
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
                      disabled={req.status !== "pending"}
                      onClick={() => handleAction(req.id, "accepted")}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      disabled={req.status !== "pending"}
                      onClick={() => handleAction(req.id, "rejected")}
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

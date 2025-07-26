import { useState } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import axios from "axios";
import { useAuthRole } from "@/hooks/useAuthRole";

const AdoptionRequests = () => {
  const { user } = useAuth();
  const { role } = useAuthRole();
  const isAdmin = role === "admin";

  const {
    data: requests = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["adoption-requests"],
    queryFn: () =>
      axios
        .get("http://localhost:8000/api/pets/adoption-requests", {
          params: { userId: user.uid },
        })
        .then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: async ({ id, action }) =>
      axios.patch(
        "http://localhost:8000/api/pets/adoption-requests",
        { status: action },
        { params: { id } }
      ),
    onSuccess: (_data, variables) => {
      refetch();
      toast.success(
        `Request ${variables.action === "Approved" ? "accepted" : "rejected"}!`
      );
    },
    onError: () => toast.error("Something went wrong. Please try again."),
  });

  const handleAction = (id, action) => {
    mutation.mutate({ id, action });
  };

  if (isLoading || !user) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-primary border-solid" />
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
      <h2 className="text-3xl font-semibold mb-6 text-center lg:text-left">
        Adoption Requests
      </h2>

      {requests?.length === 0 ? (
        <p className="text-gray-500 text-center">No adoption requests yet.</p>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden lg:block overflow-x-auto">
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
                  <tr key={req._id} className="border-t">
                    <td className="p-3">{req.petName}</td>
                    <td className="p-3">{req.userName}</td>
                    <td className="p-3">{req.userEmail}</td>
                    <td className="p-3">{req.phone}</td>
                    <td className="p-3">{req.address}</td>
                    <td className="p-3 capitalize">
                      <span
                        className={`px-2 py-1 rounded text-white text-xs ${
                          req.status === "Approved"
                            ? "bg-green-500"
                            : req.status === "Rejected"
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
                        disabled={req.status !== "Pending"}
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

          {/* Mobile Card View */}
          <div className="lg:hidden space-y-4">
            {requests.map((req) => (
              <motion.div
                key={req._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border rounded-lg p-4 shadow-sm bg-white space-y-2"
              >
                <div className="text-lg font-semibold">{req.petName}</div>
                <div className="text-sm text-gray-600">
                  <strong>Adopter:</strong> {req.userName}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Email:</strong> {req.userEmail}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Phone:</strong> {req.phone}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Location:</strong> {req.address}
                </div>
                <div>
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      req.status === "Approved"
                        ? "bg-green-500"
                        : req.status === "Rejected"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  >
                    {req.status}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={req.status !== "Pending"}
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
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.div>
  );
};

export default AdoptionRequests;

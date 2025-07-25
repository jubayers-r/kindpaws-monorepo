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
import { Pencil, Trash2, Repeat } from "lucide-react";
import axios from "axios";

import { Link } from "react-router";

export default function PetsTable({ user, role }) {
  const isAdmin = role === "admin";

  const {
    data: pets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allPets"],
    queryFn: async () => {
      const res = await fetch("http://localhost:8000/api/pets");
      if (!res.ok) throw new Error("Failed to fetch pets");
      return res.json();
    },
  });

  const filteredPets = isAdmin
    ? pets
    : pets.filter((pet) => pet?.ownerId === user?.uid);
  console.log(filteredPets);

  const deletePet = useMutation({
    mutationFn: async (petId) => {
      const res = await axios.delete(`http://localhost:8000/api/pets/delete`, {
        params: { id: petId },
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Pet deleted successfully");
      refetch();
    },
    onError: () => toast.error("Failed to delete pet"),
  });

  const toggleStatus = useMutation({
    mutationFn: async (petId) => {
      const res = await axios.patch(
        `http://localhost:8000/api/pets/statusToggle`,
        {},
        {
          params: { id: petId },
        }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Pet status updated");
      refetch();
    },
    onError: () => toast.error("Failed to update pet status"),
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full"
    >
      {/* TABLE FOR DESKTOP */}
      <div className="hidden lg:block overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              {isAdmin && (
                <>
                  <TableHead>Owner Picture</TableHead>
                  <TableHead>Owner</TableHead>
                </>
              )}

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
            ) : filteredPets.length > 0 ? (
              filteredPets.map((pet) => (
                <TableRow key={pet._id}>
                  <TableCell>
                    <img
                      src={pet.image || "/placeholder.jpg"}
                      alt={pet.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell>{pet.name}</TableCell>
                  <TableCell className="capitalize">{pet.category}</TableCell>
                  <TableCell>
                    <Badge variant={pet.isAdopted ? "secondary" : "default"}>
                      {pet.isAdopted ? "Adopted" : "Not Adopted"}
                    </Badge>
                  </TableCell>
                  {isAdmin && (
                    <>
                      {" "}
                      <TableCell>
                        <img
                          src={pet.ownerPhoto}
                          alt={pet.ownerName || "N/A"}
                          className="w-12 h-12 rounded-md object-cover"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="text-sm font-medium">
                          {pet.ownerName || "N/A"}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {pet.ownerName || "N/A"}
                        </div>
                      </TableCell>
                    </>
                  )}
                  <TableCell className="flex justify-end gap-2 flex-wrap">
                    {isAdmin && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleStatus.mutate(pet._id)}
                        >
                          <Repeat className="w-4 h-4 mr-1" />
                          {pet.isAdopted ? "Unadopt" : "Adopt"}
                        </Button>
                      </>
                    )}
                    <Link to={`/dashboard/update-pet/${pet._id}`}>
                      <Button size="sm" variant="default">
                        <Pencil className="w-4 h-4 mr-1" /> Edit
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deletePet.mutate(pet._id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-muted-foreground"
                >
                  No pets found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* CARD VIEW FOR MOBILE */}
      <div className="lg:hidden flex flex-col gap-4">
        {isLoading ? (
          [...Array(3)].map((_, i) => (
            <div key={i} className="p-4 border rounded-lg shadow-sm space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/3" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))
        ) : filteredPets.length > 0 ? (
          filteredPets.map((pet) => (
            <div
              key={pet._id}
              className="p-4 border rounded-lg shadow-sm space-y-2 bg-white"
            >
              <div className="flex items-center gap-4">
                <img
                  src={pet.image || "/placeholder.jpg"}
                  alt={pet.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{pet.name}</h3>
                  <p className="text-sm text-muted-foreground capitalize">
                    {pet.category}
                  </p>
                  <Badge variant={pet.isAdopted ? "secondary" : "default"}>
                    {pet.isAdopted ? "Adopted" : "Not Adopted"}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <img
                  src={pet.ownerPhoto}
                  alt={pet.ownerName || "N/A"}
                  className="w-10 h-10 rounded-md object-cover"
                />
                <div>
                  <p className="text-sm font-medium">
                    {pet.ownerName || "N/A"}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleStatus.mutate(pet._id)}
                >
                  <Repeat className="w-4 h-4 mr-1" />
                  {pet.isAdopted ? "Unadopt" : "Adopt"}
                </Button>
                <Link to={`/dashboard/update-pet/${pet._id}`}>
                  <Button size="sm" variant="default">
                    <Pencil className="w-4 h-4 mr-1" /> Edit
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deletePet.mutate(pet._id)}
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground">
            No pets found.
          </div>
        )}
      </div>
    </motion.div>
  );
}

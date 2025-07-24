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

export default function AllPetsTable() {

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
      className="w-full overflow-x-auto"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Owner Picture</TableHead>
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
          ) : pets.length > 0 ? (
            pets.map((pet) => (
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
                <TableCell>
                  <img
                    src={pet.ownerPhoto}
                    alt={pet.ownerName || "N/A"}
                    className="w-12 h-12"
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
                <TableCell className="flex justify-end gap-2">
                  {/* Toggle status */}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => toggleStatus.mutate(pet._id)}
                  >
                    <Repeat className="w-4 h-4 mr-1" />
                    {pet.isAdopted ? "Unadopt" : "Adopt"}
                  </Button>

                  {/* Edit (connect this to a modal or update form logic) */}
                  <Button
                    size="sm"
                    variant="default"
                    onClick={() => console.log("open edit modal for:", pet._id)}
                  >
                    <Pencil className="w-4 h-4 mr-1" /> Edit
                  </Button>

                  {/* Delete */}
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
                colSpan={6}
                className="text-center text-muted-foreground"
              >
                No pets found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </motion.div>
  );
}

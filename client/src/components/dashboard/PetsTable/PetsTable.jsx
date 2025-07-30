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

import { Link, useLocation } from "react-router";
import { useState } from "react";

export default function PetsTable({ user, role }) {
  const {
    data: pets = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["allPets"],
    queryFn: async () => {
      const res = await fetch("https://kind-paws.vercel.app/api/pets");
      if (!res.ok) throw new Error("Failed to fetch pets");
      return res.json();
    },
  });

  const deletePet = useMutation({
    mutationFn: async (petId) => {
      const res = await axios.delete(
        `https://kind-paws.vercel.app/api/pets/delete`,
        {
          params: { id: petId },
        }
      );
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
        `https://kind-paws.vercel.app/api/pets/statusToggle`,
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

  // sort logic with filter logic
  const { pathname } = useLocation();
  const isAdmin = role === "admin";

  const isAllPetsLocation = pathname === "/dashboard/all-pets";

  const AllPetsLogic = isAdmin && isAllPetsLocation;

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const filteredPets = AllPetsLogic
    ? pets
    : pets.filter((pet) => pet?.ownerId === user?.uid);
  console.log(filteredPets);

  const sortedPets = [...filteredPets];
  if (sortConfig.key) {
    sortedPets.sort((a, b) => {
      const aValue = a[sortConfig.key]?.toString().toLowerCase() || "";
      const bValue = b[sortConfig.key]?.toString().toLowerCase() || "";
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }

  const requestSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const getSortArrow = (key) => {
    if (sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  // pagination logic

  const [currentPage, setCurrentPage] = useState(1);
  const petsPerPage = 10;

  const totalPages = Math.ceil(sortedPets.length / petsPerPage);
  const paginatedPets = sortedPets.slice(
    (currentPage - 1) * petsPerPage,
    currentPage * petsPerPage
  );

  const goToNextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full"
    >
      {/* TABLE FOR DESKTOP */}
      <div className="hidden overflow-x-auto lg:flex flex-col  dark:bg-primary-foreground">
        <Table className={"flex-grow "}>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Image</TableHead>
              <TableHead
                onClick={() => requestSort("name")}
                className="cursor-pointer"
              >
                Name {getSortArrow("name")}
              </TableHead>
              <TableHead
                onClick={() => requestSort("category")}
                className="cursor-pointer"
              >
                Type {getSortArrow("category")}
              </TableHead>
              <TableHead
                onClick={() => requestSort("isAdopted")}
                className="cursor-pointer"
              >
                Status {getSortArrow("isAdopted")}
              </TableHead>
              {isAdmin && (
                <>
                  <TableHead>Owner Picture</TableHead>
                  <TableHead
                    onClick={() => requestSort("ownerName")}
                    className="cursor-pointer"
                  >
                    Owner {getSortArrow("ownerName")}
                  </TableHead>
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
            ) : sortedPets.length > 0 ? (
              paginatedPets.map((pet, index) => (
                <TableRow key={pet._id}>
                  <TableCell>
                    {(currentPage - 1) * petsPerPage + index + 1}
                  </TableCell>
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
                          {pet.ownerEmail || "N/A"}
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
        {totalPages > 1 && (
          <div className="flex justify-end gap-2 mt-4">
            <Button
              size="sm"
              variant="outline"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm px-2 py-1 border rounded">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
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
        ) : sortedPets.length > 0 ? (
          sortedPets.map((pet) => (
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
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <Button
              size="sm"
              variant="outline"
              onClick={goToPrevPage}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className="text-sm px-2 py-1 border rounded">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}

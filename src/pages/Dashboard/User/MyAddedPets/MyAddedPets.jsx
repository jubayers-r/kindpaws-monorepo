import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "motion/react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

// Mock API route: Replace with your real protected fetch
const fetchMyPets = async () => {
  const res = await fetch("http://localhost:8000/api/pets");
  return res.json();
};

const MyAddedPets = () => {
  // pagination

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: false,
    pageCount: Math.ceil(data.length / 10),
    state: {
      pagination: {
        pageIndex,
        pageSize: 10,
      },
    },
    onPaginationChange: setPagination,
  });

  // pagination

  const navigate = useNavigate();

  // Redirect to update page
  const handleUpdate = (petId) => {
    navigate(`/dashboard/update-pet/${petId}`);
  };

  // Show confirm modal before delete
  const handleDelete = async (petId) => {
    const confirmed = window.confirm("Are you sure?");
    if (confirmed) {
      deleteMutation.mutate(petId);
    }
    if (!confirmed) return;

    // try {
    //   const res = await fetch(`/api/pets/${petId}`, { method: "DELETE" });
    //   const result = await res.json();

    //   if (result.success) {
    //     toast.success("Pet deleted successfully");
    //     // optionally refetch your data
    //   } else {
    //     toast.error(result.message || "Failed to delete pet");
    //   }
    // } catch (err) {
    //   console.error(err);
    //   toast.error("An error occurred while deleting");
    // }
  };

  // Mark pet as adopted
  const handleAdopt = async (petId) => {
    // try {
    //   const res = await fetch(`/api/pets/${petId}/adopt`, {
    //     method: "PATCH",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ adopted: true }),
    //   });
    //   const result = await res.json();

    //   if (result.success) {
    //     toast.success("Pet marked as adopted");
    //     // optionally refetch your data
    //   } else {
    //     toast.error(result.message || "Failed to update adoption status");
    //   }
    // } catch (err) {
    //   console.error(err);
    //   toast.error("An error occurred while updating status");
    // }
  };

  const queryClient = useQueryClient();
  const [selectedPet, setSelectedPet] = React.useState(null);

  const { data = [], isLoading } = useQuery({
    queryKey: ["mypets"],
    queryFn: fetchMyPets,
  });

  const deleteMutation = useMutation({
    // mutationFn: async (id) => {
    //   const res = await fetch(`/api/pets/${id}`, {
    //     method: "DELETE",
    //   });
    //   return res.json();
    // },
    // onSuccess: () => {
    //   toast.success("Pet deleted successfully");
    //   queryClient.invalidateQueries(["mypets"]);
    // },
  });

  const adoptMutation = useMutation({
    // mutationFn: async (id) => {
    //   const res = await fetch(`/api/pets/${id}/adopt`, {
    //     method: "PATCH",
    //   });
    //   return res.json();
    // },
    // onSuccess: () => {
    //   toast.success("Pet marked as adopted");
    //   queryClient.invalidateQueries(["mypets"]);
    // },
  });

  const columns = [
    {
      header: "Serial No.",
      accessorFn: (row, index) => index + 1,
      cell: (info) => info.getValue(),
    },
    {
      header: "Pet Name",
      accessorKey: "name",
    },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Image",
      accessorKey: "image",
      cell: (info) => (
        <img
          src={info.getValue()}
          alt="Pet"
          className="w-12 h-12 object-cover rounded"
        />
      ),
    },
    {
      header: "Adoption Status",
      accessorKey: "adopted",
      cell: (info) => (
        <span className={info.getValue() ? "text-green-600" : "text-red-600"}>
          {info.getValue() ? "Adopted" : "Not Adopted"}
        </span>
      ),
    },
    {
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button onClick={() => handleUpdate(row.original.id)}>Update</Button>
          <Button
            variant="destructive"
            onClick={() => handleDelete(row.original.id)}
          >
            Delete
          </Button>
          {!row.original.adopted && (
            <Button
              variant="outline"
              onClick={() => handleAdopt(row.original.id)}
            >
              Mark Adopted
            </Button>
          )}
        </div>
      ),
    },
  ];

  
  return (
    <motion.div
      className="p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h2 className="text-2xl font-bold mb-4">My Added Pets</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="cursor-pointer"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {{ asc: " ↑", desc: " ↓" }[header.column.getIsSorted()] ||
                      ""}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table
              .getRowModel()
              .rows.slice(
                pagination.pageIndex * 10,
                (pagination.pageIndex + 1) * 10
              )
              .map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {/* Pagination */}
        {data.length > 10 && (
          <div className="flex justify-end mt-4 gap-2">
            <Button
              variant="outline"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MyAddedPets;

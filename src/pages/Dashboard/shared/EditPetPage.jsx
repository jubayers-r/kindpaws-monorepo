import PetForm from "@/components/shared/PetForm/PetForm";
import { useAuth } from "@/hooks/useAuth";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const EditPetPage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const navigate = useNavigate();

  // Fetch pet by id
  const {
    data: pet,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pet", id],
    queryFn: () =>
      axios
        .get(`https://kind-paws.vercel.app/api/pets/${id}`)
        .then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axios.put(
        `https://kind-paws.vercel.app/api/pets/${id}`,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      refetch();
      toast.success("Pet updated successfully!");
      navigate(-1);
    },
    onError: () => toast.error("Failed to update pet. Try again."),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <h3 className="font-bold text-2xl text-center">Update Pet Details</h3>
      <PetForm
        initialData={pet}
        onSubmit={(payload) => mutation.mutate(payload)}
      />
    </>
  );
};

export default EditPetPage;

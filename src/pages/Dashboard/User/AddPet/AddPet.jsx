import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import PetForm from "@/components/shared/PetForm/PetForm";
import { useNavigate } from "react-router";

const AddPetPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axios.post(
        "http://localhost:8000/api/pets/add-pet",
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Pet added successfully!");
      navigate("/dashboard/my-added-pets");
      // nagivate to my added pets
    },
    onError: () => {
      toast.error("Failed to add pet. Try again.");
    },
  });

  return (
    <PetForm
      onSubmit={(payload) => mutation.mutate(payload)}
      isSubmitting={mutation.isLoading}
    />
  );
};

export default AddPetPage;

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import PetForm from '@/components/shared/PetForm/PetForm';

const AddPetPage = () => {
  const { user } = useAuth();

  const mutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axios.post(
        'http://localhost:8000/api/pets/add-pet',
        payload,
        { params: { uid: user.uid } }
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success('Pet added successfully!');
    },
    onError: () => {
      toast.error('Failed to add pet. Try again.');
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
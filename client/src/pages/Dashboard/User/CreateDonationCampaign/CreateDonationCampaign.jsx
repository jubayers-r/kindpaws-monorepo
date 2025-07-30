import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import CreateCampaignForm from "../../../../components/shared/CreateCampaignForm/CreateCampaignForm";

const CreateDonationCampaign = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const mutation = useMutation({
    mutationFn: async (payload) => {
      console.log(payload);
      const res = await axios.post(
        "https://kind-paws.vercel.app/api/campaigns/add-campaign",
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Campaign created successfully!");
      navigate("/dashboard/my-campaigns"); // update this path if needed
    },
    onError: () => {
      toast.error("Failed to create campaign.");
    },
  });

  return (
    <CreateCampaignForm
      onSubmit={(payload) => mutation.mutate(payload)}
      isSubmitting={mutation.isLoading}
    />
  );
};

export default CreateDonationCampaign;

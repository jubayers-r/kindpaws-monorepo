// pages/dashboard/edit-donation/EditCampaign.jsx
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams, useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

import CreateCampaignForm from "@/components/shared/CreateCampaignForm/CreateCampaignForm";

const EditCampaign = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  console.log(id);

  const {
    data: campaign,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["campaign", id],
    queryFn: () =>
      axios
        .get(`https://kind-paws.vercel.app/api/campaigns/${id}`)
        .then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: async (payload) => {
      const res = await axios.put(
        `https://kind-paws.vercel.app/api/campaigns/${id}`,
        payload
      );
      return res.data;
    },
    onSuccess: () => {
      toast.success("Campaign updated successfully!");
      navigate(-1);
    },
    onError: () => toast.error("Failed to update campaign."),
  });

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <>
      <CreateCampaignForm
        initialData={campaign}
        onSubmit={(payload) => mutation.mutate(payload)}
        isSubmitting={mutation.isLoading}
      />
    </>
  );
};

export default EditCampaign;

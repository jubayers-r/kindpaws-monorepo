import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "motion/react";
import { toast } from "sonner";
import CampaignDonationModal from "@/components/campaignPage/CampaignDonationModal";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import LoadingScreen from "@/components/shared/LoadingScreen/LoadingScreen";
import ErrorPage from "@/components/ErrorPage/ErrorPage";

const CampaignDetailsPage = () => {
  const { id } = useParams();
  const [amount, setAmount] = useState("");

  const { data: campaign, isLoading, error: campaignError } = useQuery({
    queryKey: ["campaign", id],
    meta: { globalErrorToast: false },
    queryFn: async () => {
      const res = await axios.get(
        `https://kind-paws.vercel.app/api/campaigns/${id}`
      );
      return res.data;
    },
  });



  const handleDonate = () => {
    if (!amount || isNaN(amount)) return toast.error("Enter a valid amount");
    // Stripe logic would go here
    toast.success("Donation submitted!");
    setAmount("");
  };

  if (campaignError && !campaign) {
    return <ErrorPage error={campaignError} />;
  }

  if (isLoading || !campaign) {
    return <LoadingScreen isLoading={true} />;
  }

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

  return (
    <motion.div
      className="max-w-5xl mx-auto p-6 space-y-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.img
        src={campaign.image}
        alt={campaign.title}
        className="w-full rounded-xl shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      />

      <div className="space-y-1">
        <h1 className="text-4xl font-bold">{campaign.title}</h1>
        <p className="text-muted-foreground text-lg">
          {campaign.shortDescription}
        </p>
      </div>

      <div className="space-y-3">
        <div className="bg-gray-200 h-4 rounded-full overflow-hidden">
          <div
            className="bg-primary h-full"
            style={{
              width: `${
                (campaign.collectedAmount / campaign.goalAmount) * 100
              }%`,
            }}
          />
        </div>
        <div className="flex justify-between text-sm">
          <span>Raised: ${campaign.collectedAmount}</span>
          <span>Goal: ${campaign.goalAmount}</span>
        </div>
      </div>

      {/* stripe */}
      <Elements stripe={stripePromise}>
        <CampaignDonationModal campaign={campaign} />
      </Elements>
      {/* stripe */}

      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: campaign.longDescription }}
      />

      <div className="flex flex-wrap gap-2">
        {campaign.tags.map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>

      <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-4 shadow-sm">
        <img
          src={campaign.ownerPhoto}
          alt={campaign.ownerName}
          className="w-14 h-14 rounded-full object-cover"
        />
        <div>
          <div className="font-medium">{campaign.ownerName}</div>
        </div>
      </div>

      <div className="text-sm text-gray-600 flex flex-wrap gap-4">
        <span>📍 {campaign.location}</span>
        <span>
          📅 Created: {new Date(campaign.createdAt).toLocaleDateString()}
        </span>
        <span>
          ⏳ Deadline: {new Date(campaign.deadline).toLocaleDateString()}
        </span>
        {campaign.isFeatured && (
          <span className="text-yellow-600">🌟 Featured</span>
        )}
      </div>

      {campaign.updates.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mt-8 mb-4">Campaign Updates</h2>
          <ul className="space-y-3">
            {campaign.updates.map((update, idx) => (
              <li key={idx} className="bg-white p-4 rounded-md shadow">
                <div className="text-sm text-gray-500">
                  {new Date(update.date).toLocaleDateString()}
                </div>
                <p>{update.message}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

    </motion.div>
  );
};

export default CampaignDetailsPage;

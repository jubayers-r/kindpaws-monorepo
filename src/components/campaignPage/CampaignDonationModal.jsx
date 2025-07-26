import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "sonner";
import { motion } from "framer-motion";
import axios from "axios";
import CardComponent from "@/components/shared/CardComponent/CardComponent";

const CampaignDonationModal = ({ campaign }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [amount, setAmount] = useState("100");
  const [isLoading, setIsLoading] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [recommendedCampaigns, setRecommendedCampaigns] = useState([]);

  const handleDonate = async () => {
    if (!stripe || !elements) return;
    if (!amount || isNaN(amount)) {
      toast.error("Please enter a valid amount.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/campaigns/create-payment-intent",
        {
          amount: parseInt(amount),
          campaignId: campaign._id,
        }
      );

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        toast.success("Donation successful!");
        setDonationSuccess(true);
        setAmount("100");
        fetchRecommendedCampaigns();
      }
    } catch (error) {
      toast.error("Something went wrong during donation.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRecommendedCampaigns = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/campaigns", {
        params: { limit: 3, excludeId: campaign._id },
      });
      setRecommendedCampaigns(data);
    } catch (err) {
      console.error("Failed to fetch recommended campaigns", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          className="w-fit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button>Donate Now</Button>
        </motion.div>
      </DialogTrigger>

      <DialogContent>
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <DialogHeader>
            <DialogTitle>Donate to {campaign.title}</DialogTitle>
          </DialogHeader>

          {!donationSuccess ? (
            <div className="space-y-4">
              <div>
                <Label>Amount (USD)</Label>
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter donation amount"
                />
              </div>

              <div className="border p-3 rounded-md">
                <CardElement options={{ hidePostalCode: true }} />
              </div>

              <Button
                onClick={handleDonate}
                disabled={isLoading || !stripe || !elements}
              >
                {isLoading ? "Processing..." : "Submit Donation"}
              </Button>
            </div>
          ) : (
            <div className="space-y-5">
              <h3 className="text-xl font-semibold">Thank you for your support!</h3>
              <p className="text-muted-foreground">
                Want to support more causes? Here are some other active campaigns:
              </p>

              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                {recommendedCampaigns.map((rec) => (
                  <CardComponent key={rec._id} data={rec} type="campaign" />
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignDonationModal;

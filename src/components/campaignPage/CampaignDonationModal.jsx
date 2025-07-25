""// CampaignDetailsPage.tsx or .jsx

import { useState } from "react";
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

const CampaignDonationModal = ({ campaign }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [amount, setAmount] = useState("100");
  const [isLoading, setIsLoading] = useState(false);

  const handleDonate = async () => {
    if (!stripe || !elements) return;
    if (!amount || isNaN(amount)) {
      toast.error("Please enter a valid amount.");
      return;
    }

    setIsLoading(true);

    try {
      // Step 1: Create payment intent
      const res = await axios.post("http://localhost:8000/api/campaigns/create-payment-intent", {
        amount: parseInt(amount),
        campaignId: campaign._id,
      });

      const clientSecret = res.data.clientSecret;

      // Step 2: Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else if (result.paymentIntent.status === "succeeded") {
        toast.success("Donation successful!");
        setAmount("100");
        // Optional: refresh campaign data
      }
    } catch (error) {
      toast.error("Something went wrong during donation.");
      console.error(error);
    } finally {
      setIsLoading(false);
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
          className="space-y-5"
        >
          <DialogHeader>
            <DialogTitle>Donate to {campaign.title}</DialogTitle>
          </DialogHeader>

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
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default CampaignDonationModal;

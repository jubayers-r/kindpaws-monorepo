import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

const CTA = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="flex flex-wrap gap-4"
    >
      <Button
        onClick={() => alert("Navigate to add new pet")}
        className="flex-1"
      >
        Add New Pet
      </Button>
      <Button
        onClick={() => alert("Navigate to create campaign")}
        className="flex-1"
        variant="outline"
      >
        Create Campaign
      </Button>
      <Button
        onClick={() => alert("View your donations")}
        className="flex-1"
        variant="secondary"
      >
        Your Donations
      </Button>
    </motion.div>
  );
};

export default CTA;

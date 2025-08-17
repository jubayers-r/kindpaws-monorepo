import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { motion } from "motion/react";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <h1 className="text-6xl font-bold text-red-500">404</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Oops! Page Not Found
        </h2>
        <p className="mt-2 text-gray-600">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <div className="mt-6">
          <Button
            onClick={() => navigate("/")}
            className="rounded-2xl px-6 py-2 shadow-md"
          >
            Go Home
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

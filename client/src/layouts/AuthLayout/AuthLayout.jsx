import { Outlet } from "react-router";
import { motion } from "motion/react";

const AuthLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-background text-foreground font-[Laila] ">
      {/* Left Side Image/Quote */}
      <div className="hidden md:flex items-center justify-center bg-secondary px-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-white space-y-5 max-w-sm"
        >
          <h2 className="text-3xl font-bold leading-tight">
            Every paw deserves a home.
          </h2>
          <p className="text-lg">
            Join our community and help rescue, care for, or adopt a furry
            friend in need.
          </p>
          <img
            src="https://www.aspca.org/sites/default/files/dog-care_general-dog-care_main-image.jpg"
            alt="Pet"
            className="rounded-xl shadow-lg"
          />
        </motion.div>
      </div>

      {/* Right Side Form Outlet */}

      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { User, Mail } from "lucide-react";
import PasswordInput from "@/components/shared/PasswordInput/PasswordInput";
import { FaGoogle } from "react-icons/fa6";
import { use } from "react";
import { AuthContext } from "@/context/auth/AuthContext";
import { Link } from "react-router";

export default function Register() {
  const { googleLogin } = use(AuthContext);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/20">
      <div className="max-w-md 2xl:w-9/11 w-[95%] mx-auto">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center"
        >
          <div className="bg-white rounded-2xl p-10 shadow-xl w-full">
            <h2 className="text-2xl font-bold text-center text-primary mb-6">
              Create an Account
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Your full name"
                    className="pl-10"
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <PasswordInput />

              <Button className="w-full mt-4">Register</Button>

              <p className="text-sm text-center mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-primary underline">
                  Login here
                </Link>
              </p>

              {/* google signup */}
              <div className="mt-6 w-full">
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-muted-foreground">
                      Or
                    </span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="outline"
                    className="w-full sm:w-72 flex items-center gap-3 text-sm font-medium shadow-sm hover:bg-muted transition"
                    onClick={() => googleLogin()}
                  >
                    <FaGoogle className="w-5 h-5 text-[#EA4335]" />
                    Continue with Google
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { Mail, Lock } from "lucide-react";
import PasswordInput from "@/components/shared/PasswordInput/PasswordInput";
import { FaGoogle } from "react-icons/fa6";
import { use } from "react";
import { AuthContext } from "@/context/auth/AuthContext";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";
import { auth } from "@/firebase/firebase.init";

export default function Login() {
  const { logIn } = use(AuthContext);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const { googleLogin, stateData } = use(AuthContext);
  const navigate = useNavigate();

  const updateLastLogin = async (userId) => {
    try {
      await axios.patch(`http://localhost:8000/api/users/last-login/${userId}`);
    } catch (err) {
      console.error("❌ Failed to update last login:", err);
    }
  };

  const onSubmit = async (data) => {
    try {
      await logIn(data.email, data.password);
      const currentUser = auth.currentUser;
      if (currentUser) {
        await updateLastLogin(currentUser.uid);
      }
      navigate(stateData ? stateData : "/");
    } catch (error) {
      // Handle Firebase error
      if (error.code === "auth/wrong-password") {
        setError("password", {
          type: "manual",
          message: "Incorrect password",
        });
      } else if (error.code === "auth/user-not-found") {
        setError("email", {
          type: "manual",
          message: "No user found with this email",
        });
      } else {
        setError("password", {
          type: "manual",
          message: "Authentication failed",
        });
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/20">
      <div className="  max-w-md 2xl:w-9/11 w-[95%] mx-auto">
        {/* Right Column - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center"
        >
          <div className="bg-white rounded-2xl p-10 shadow-xl w-full">
            <h2 className="text-2xl font-bold text-center text-primary mb-6">
              Welcome Back
            </h2>

            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2 text-muted-foreground h-5 w-5" />
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <PasswordInput register={register} errors={errors} />

                <Button type="submit" className="w-full mt-4">
                  Login
                </Button>
              </form>

              <p className="text-sm text-center mt-4">
                New to PawLink?{" "}
                <Link to="/register" className="text-primary underline">
                  Register here
                </Link>
              </p>
              {/* google login */}
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
                    <FaGoogle className="w-5 h-5 text-primary" />
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

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { User, Mail } from "lucide-react";
import PasswordInput from "@/components/shared/PasswordInput/PasswordInput";
import { FaGoogle } from "react-icons/fa6";
import { use, useState } from "react";
import { AuthContext } from "@/context/auth/AuthContext";
import { Link, useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { updateProfile } from "firebase/auth";
import { auth } from "@/firebase/firebase.init";
import axios from "axios";

export default function Register() {
  const { googleLogin, createUser, stateData, setUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [submitError, setSubmitError] = useState("");

  const onSubmit = async (data) => {
    try {
      const imageFile = data.photo?.[0];
      const imageUrl = imageFile && (await uploadToImgBB(imageFile));

      const { user } = await createUser(data.email, data.password);
      setUser(user);
      navigate(stateData ? stateData : "/");

      await updateProfile(user, {
        displayName: data.name,
        ...(imageUrl
          ? { photoURL: imageUrl }
          : {
              photoURL: "https://img.icons8.com/?size=256&id=89245&format=png",
            }),
      });

      const userDB = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        role: "user",
        lastLoginAt: new Date(),
      };

      await axios.post("http://localhost:8000/api/users/register", userDB);
      console.log("✅ User created:", {
        name: data.name,
        email: data.email,
        imageUrl,
      });

      // Optionally: redirect, toast, etc.
    } catch (err) {
      console.error(err);

      // Show Firebase-friendly message
      if (err.code === "auth/email-already-in-use") {
        setSubmitError("This email is already registered. Please use another.");
      } else {
        setSubmitError("Something went wrong. Please try again.");
      }
    }
  };

  const uploadToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const imgUpload = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_imgbb_apiKey
    }`;

    const res = await axios.post(imgUpload, formData);

    const data = await res.data;

    if (data.success) {
      return data.data.url; // The direct image URL
    } else {
      throw new Error("Image upload failed");
    }
  };

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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  {/* name */}
                  <label className="text-sm font-medium">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2 text-muted-foreground h-5 w-5" />
                    <Input
                      type="text"
                      placeholder="Your full name"
                      className="pl-10"
                      autoComplete="name"
                      {...register("name", { required: "Name is required" })}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                {/* image upload */}
                <div>
                  <label className="text-sm font-medium">Profile Picture</label>
                  <Input
                    type="file"
                    accept="image/*"
                    {...register("photo", {
                      validate: {
                        fileType: (fileList) => {
                          if (!fileList || fileList.length === 0) return true; // ✅ no file = valid
                          return (
                            fileList[0].type.startsWith("image/") ||
                            "Only image files are allowed"
                          );
                        },
                      },
                    })}
                  />
                  {errors.photo && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.photo.message}
                    </p>
                  )}
                </div>
                {/* email */}
                <div>
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
                </div>
                {/* passoword */}
                <PasswordInput register={register} errors={errors} />
                {submitError && (
                  <p className="text-sm text-red-500 mt-1">{submitError}</p>
                )}

                <Button className="w-full mt-4">Register</Button>
              </form>

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
                    type="submit"
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

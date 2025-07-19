import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff } from "lucide-react";

const PasswordInput = ({ register, errors }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="text-sm font-medium">Password</label>
      <div className="relative">
        <Lock className="absolute left-3 top-2 text-muted-foreground h-5 w-5" />
        <Input
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          className="pl-10"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-2 text-muted-foreground focus:outline-none"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
      {errors?.password && (
        <p className="text-sm text-red-500 mt-1">{errors.password?.message}</p>
      )}
    </div>
  );
};

export default PasswordInput;

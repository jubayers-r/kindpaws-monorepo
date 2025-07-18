import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff } from "lucide-react";

const PasswordInput = () => {
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
          required
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
    </div>
  );
};

export default PasswordInput;

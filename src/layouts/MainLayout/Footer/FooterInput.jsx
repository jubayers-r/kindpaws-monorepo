import { Logo } from "@/assets/Logo";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

const FooterInput = () => {
  return (
    <div className="space-y-5">
      <div className="flex justify-center md:justify-start">

      <Logo />
      </div>
      <p className="text-center md:text-left">
        We're here to help you give pets a better life — whether you're a
        first-time adopter or ready to welcome another friend into your home.
        Have questions? We're just a paw away.
      </p>
      <div className="relative w-full  mx-auto mb-5">
        {/* Input */}
        <Input
          type="email"
          placeholder="Ask your Question"
          className="px-5 py-6 rounded-full bg-transparent text-white !placeholder-gray-400  "
        />
        {/* Send Icon on the left */}
        <span className="absolute inset-y-0 right-1 top-1 flex items-center justify-center text-white hover:text-secondary hover:bg-white cursor-pointer  rounded-full bg-primary w-10.5 h-10.5 ">
          <Send className="w-4 h-4  pointer-events-none" />
        </span>
      </div>
    </div>
  );
};

export default FooterInput;

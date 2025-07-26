import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router"; // use `Link` if using Next.js
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function AvatarDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logOut } = useAuth();
  const dropdownRef = useRef(null);

  // Close on outside click or key press
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    const handleKeyDown = () => {
      setOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative inline-block text-left " ref={dropdownRef}>
      <Button
        variant="ghost"
        className="rounded-full p-0 "
        onClick={() => setOpen((prev) => !prev)}
      >
        <Avatar className="h-12 w-12 ">
          <AvatarImage src={user.photoURL} alt="User Avatar" />
          <AvatarFallback>DP</AvatarFallback>
        </Avatar>
        {open ? (
          <ChevronUp className="absolute bottom-2 right-3 bg-white rounded-full shadow-md text-gray-500 z-10" />
        ) : (
          <ChevronDown className="absolute bottom-2 right-3 bg-white rounded-full shadow-md text-gray-500 z-10" />
        )}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute right-0 z-50 mt-2 lg:w-60 w-40 origin-top-right rounded-xl bg-white shadow-lg "
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="py-2 px-4 border-b border-gray-200">
              <p className="text-sm font-semibold text-gray-900">
                {user?.displayName}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <div className="py-1">
              <button
                onClick={() => {
                  navigate("/dashboard");
                  setOpen(false);
                }}
                className={
                  "block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 "
                }
              >
                Dashboard
              </button>
              <button
                onClick={() => {
                  logOut();
                  setOpen(false);
                }}
                className={
                  "block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-b-xl"
                }
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

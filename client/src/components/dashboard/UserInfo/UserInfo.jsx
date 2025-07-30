import { motion } from "motion/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

const UserInfo = () => {

  const {user} = useAuth();


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-4"
    >
      <Avatar className="w-16 h-16">
        {user.image ? (
          <AvatarImage src={user.image} alt={user.displayName} />
        ) : (
          <AvatarFallback>{user.displayName.slice(0, 2).toUpperCase()}</AvatarFallback>
        )}
      </Avatar>
      <div>
        <h2 className="text-2xl font-semibold">Welcome, {user.displayName}!</h2>
        <p className="text-sm text-muted-foreground">{user.email}</p>
      </div>
    </motion.div>
  );
};

export default UserInfo;

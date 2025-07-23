
import { useAuthRole } from "@/hooks/useAuthRole";
import AdminOverview from "./Admin/AdminOverview";
import UserOverview from "./User/UserOverview";

const Dashboard = () => {

  const user = useAuthRole();

  console.log(user)

  return (
   <div className="p-6 space-y-6">
    {
      user.role === "admin" ? <AdminOverview/> : <UserOverview/>

    }
    </div>
  );
};

export default Dashboard;

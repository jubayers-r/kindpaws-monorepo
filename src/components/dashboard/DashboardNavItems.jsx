import {
  Users,
  PawPrint,
  HandCoins,
  PlusCircle,
  HeartHandshake,
  Megaphone,
  FolderHeart,
  HandHeart,
} from "lucide-react";

export const dashboardNavItems = [
  {
    label: "Overview",
    icon: Users,
    href: {
      admin: "/dashboard/admin",
      user: "/dashboard/user",
    },
    roles: ["admin", "user"],
  },
  {
    label: "Users",
    href: "/dashboard/users",
    icon: Users,
    roles: ["admin"],
  },
  {
    label: "All pets",
    href: "/dashboard/all-pets",
    icon: PawPrint,
    roles: ["admin"],
  },
  {
    label: "All Donations",
    href: "/dashboard/all-donations",
    icon: HandCoins,
    roles: ["admin"],
  },
  {
    label: "Add a pet",
    href: "/dashboard/add-pet",
    icon: PlusCircle,
    roles: ["user"],
  },
  {
    label: "My added pets",
    href: "/dashboard/my-added-pets",
    icon: PlusCircle,
    roles: ["user"],
  },
  {
    label: "Adoption request",
    href: "/dashboard/adoption-requests",
    icon: HeartHandshake,
    roles: ["user"],
  },
  {
    label: "Create donation campaigns",
    href: "/dashboard/create-campaign",
    icon: Megaphone,
    roles: ["user"],
  },
  {
    label: "My donation Campaigns",
    href: "/dashboard/my-campaigns",
    icon: FolderHeart,
    roles: ["user"],
  },
  {
    label: "My donations",
    href: "/dashboard/my-donations",
    icon: HandHeart,
    roles: ["user"],
  },
];

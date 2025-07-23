import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "@/pages/Home/Home";
import PetList from "@/pages/Adopt/Adopt";
import Campaigns from "@/pages/Campaigns/Campaigns";
import Adopt from "@/pages/Adopt/Adopt";
import ContactUs from "@/pages/ContactUs/ContactUs";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import Dashboard from "@/pages/Dashboard/Dashboard";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import PrivetRoute from "./PrivetRoute";
import UserTable from "@/pages/Dashboard/Admin/UsersTable/UsersTable";
import AllPetsTable from "@/pages/Dashboard/Admin/AllPetsTable/AllPetsTable";
import AllDonationsTable from "@/pages/Dashboard/Admin/AllDonationsTable";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "adopt",
        Component: Adopt,
        loader: async () => await fetch("http://localhost:8000/api/pets"),
      },
      {
        path: "campaigns",
        Component: Campaigns,
        loader: async () => await fetch("http://localhost:8000/api/campaigns"),
      },
      {
        path: "contact-us",
        Component: ContactUs,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivetRoute>
        <DashboardLayout />
      </PrivetRoute>
    ),
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "users",
        Component: UserTable,
      },
      {
        path: "users",
        Component: UserTable,
      },
      {
        path: "all-pets",
        Component: AllPetsTable,
      },
      {
        path: "all-donations",
        Component: AllDonationsTable,
      },
    ],
  },
]);

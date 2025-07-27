import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
const MainLayout = lazy(() => import("../layouts/MainLayout/MainLayout"));
const AuthLayout = lazy(() => import("@/layouts/AuthLayout/AuthLayout"));
const DashboardLayout = lazy(() =>
  import("@/layouts/DashboardLayout/DashboardLayout")
);
import Home from "@/pages/Home/Home";
import Campaigns from "@/pages/Campaigns/Campaigns";
import Adopt from "@/pages/Adopt/Adopt";
import ContactUs from "@/pages/ContactUs/ContactUs";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import Dashboard from "@/pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import UserTable from "@/pages/Dashboard/Admin/UsersTable/UsersTable";
import AllPetsTable from "@/pages/Dashboard/Admin/AllPetsTable/AllPetsTable";
import AllDonationsTable from "@/pages/Dashboard/Admin/AllDonationsTable/AllDonationsTable";
import AdoptionRequests from "@/pages/Dashboard/User/AdoptRequest/AdoptRequest";

import MyDonationCampaigns from "@/pages/Dashboard/User/MyDonationCampaigns/MyDonationCampaigns";
import MyDonations from "@/pages/Dashboard/User/MyDonations/MyDonations";
import AddPetPage from "@/pages/Dashboard/User/AddPet/AddPet";
import EditPetPage from "@/pages/Dashboard/shared/EditPetPage";
import CreateDonationCampaign from "@/pages/Dashboard/User/CreateDonationCampaign/CreateDonationCampaign";
import MyAddedPets from "@/pages/Dashboard/User/MyAddedPets/MyAddedPets";
import PetDetailsPage from "@/pages/Adopt/PetDetails/PetDetails";
import CampaignDetailsPage from "@/pages/Campaigns/CampaignDetails/CampaignDetails";
import EditCampaign from "@/pages/Dashboard/shared/EditCampaign";

import LoadingScreen from "@/components/shared/LoadingScreen/LoadingScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingScreen isLoading={true} />}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "adopt",
        Component: Adopt,
        loader: async () =>
          await fetch("https://kind-paws.vercel.app/api/pets"),
      },
      {
        path: "pet/details/:id",
        element: (
          <PrivateRoute>
            <PetDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "campaigns",
        Component: Campaigns,
        loader: async () =>
          await fetch("https://kind-paws.vercel.app/api/campaigns"),
      },
      {
        path: "campaign/details/:id",
        element: (
          <PrivateRoute>
            <CampaignDetailsPage />
          </PrivateRoute>
        ),
        loader: async ({ params }) =>
          await fetch(
            `https://kind-paws.vercel.app/api/campaigns/${params.id}`
          ),
      },
      {
        path: "contact-us",
        Component: ContactUs,
      },
    ],
  },
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingScreen isLoading={true} />}>
        <AuthLayout />
      </Suspense>
    ),
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
      <PrivateRoute>
        <Suspense fallback={<LoadingScreen isLoading={true} />}>
          <DashboardLayout />
        </Suspense>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "update-campaign/:id",
        Component: EditCampaign,
      },
      // admin
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

      {
        path: "update-pet/:id",
        Component: EditPetPage,
      },
      // user
      {
        path: "add-pet",
        Component: AddPetPage,
      },
      {
        path: "adoption-requests",
        Component: AdoptionRequests,
      },
      {
        path: "create-campaign",
        Component: CreateDonationCampaign,
      },
      {
        path: "my-campaigns",
        Component: MyDonationCampaigns,
      },
      {
        path: "my-donations",
        Component: MyDonations,
      },
      {
        path: "my-added-pets",
        Component: MyAddedPets,
      },
    ],
  },
]);

import { createBrowserRouter } from "react-router";
import { lazy, Suspense } from "react";
// const MainLayout = lazy(() => import("../layouts/MainLayout/MainLayout"));
// const AuthLayout = lazy(() => import("@/layouts/AuthLayout/AuthLayout"));
// const DashboardLayout = lazy(() =>
// import("@/layouts/DashboardLayout/DashboardLayout")
// );
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import MainLayout from "../layouts/MainLayout/MainLayout";
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

// import LoadingScreen from "@/components/shared/LoadingScreen/LoadingScreen";
import ProfilePage from "@/pages/Dashboard/shared/ProfilePage";
import ErrorPage from "@/components/ErrorPage/ErrorPage";

const loadJson = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    let message = `Failed to load data (${res.status})`;
    try {
      const body = await res.json();
      if (body?.message) message = body.message;
    } catch {
      // non-JSON error body
    }
    throw new Error(message);
  }
  return res.json();
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // <Suspense fallback={<LoadingScreen isLoading={true} />}>

      <MainLayout />
    ),
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "adopt",
        Component: Adopt,
        loader: () => loadJson("https://kind-paws.vercel.app/api/pets"),
        errorElement: <ErrorPage />,
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
        loader: () => loadJson("https://kind-paws.vercel.app/api/campaigns"),
        errorElement: <ErrorPage />,
      },
      {
        path: "campaign/details/:id",
        element: (
          <PrivateRoute>
            <CampaignDetailsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "contact-us",
        Component: ContactUs,
      },
      {
        path: "*",
        element: (
          <ErrorPage
            error={{
              status: 404,
              statusText: "Not Found",
              internal: true,
              data: null,
            }}
          />
        ),
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
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
        <DashboardLayout />
      </PrivateRoute>
    ),
    errorElement: <ErrorPage />,
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
      {
        path: "profile",
        Component: ProfilePage
      }
    ],
  },
]);

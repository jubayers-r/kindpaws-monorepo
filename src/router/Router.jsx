import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "@/pages/Home/Home";
import PetList from "@/pages/Adopt/Adopt";
import Campaigns from "@/pages/Campaigns/Campaigns";
import Adopt from "@/pages/Adopt/Adopt";
import ContactUs from "@/pages/ContactUs/ContactUs";

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
      },
      {
        path: "campaigns",
        Component: Campaigns,
      },
      {
        path: "contact-us",
        Component: ContactUs,
      },
    ],
  },
]);

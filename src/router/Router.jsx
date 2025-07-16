import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "@/pages/Home/Home";
import PetList from "@/pages/PetList/PetList";

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
        path: "pet-listing",
        Component: PetList,
      },
    ],
  },
]);

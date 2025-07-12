import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Home from "@/Home/Home";

export const router = createBrowserRouter([
{
    path: '/',
    Component: MainLayout,
    children: [
        {
            index: true,
            Component: Home
        }
    ]
}
])

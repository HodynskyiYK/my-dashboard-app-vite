import { createBrowserRouter, Navigate } from "react-router-dom";
import { DashboardsPage, DashboardDetailsPage } from "@/pages";
import { MainLayout } from "@/widgets";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboards" replace />,
      },
      {
        path: "/dashboards",
        element: <DashboardsPage />,
      },
      {
        path: "/dashboards/:id",
        element: <DashboardDetailsPage />,
      }
    ],
  },
]);
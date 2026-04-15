import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "@/widgets/layout";
import { DashboardsPage } from "@/pages/dashboards-page";
import { DashboardDetailsPage } from "@/pages/dashboard-details-page";

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
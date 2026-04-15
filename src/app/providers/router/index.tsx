import { createBrowserRouter } from "react-router-dom";
import { HomePage, DashboardsPage, DashboardDetailsPage } from "@/pages";
import { MainLayout } from "@/widgets";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthComponent } from "../components/FC/AuthComponent";
import { PageError } from "../pages/Error";
import { Home } from "../pages/Home";
import { LoginPage } from "../pages/Login";
import { Queue } from "../pages/Queue";
import { Schedule } from "../pages/Schedule";
import { User } from "../pages/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthComponent>
        <Home />
      </AuthComponent>
    ),
    errorElement: <PageError />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <PageError />,
  },
  {
    path: "/schedule",
    element: (
      <AuthComponent>
        <Schedule />
      </AuthComponent>
    ),
    errorElement: <PageError />,
  },
  {
    path: "/consults",
    element: (
      <AuthComponent>
        <Home />
      </AuthComponent>
    ),
    errorElement: <PageError />,
  },
  {
    path: "/User",
    element: <User />,
  },
  {
    path: "/queue",
    element: <Queue />,
  },
]);

export const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};

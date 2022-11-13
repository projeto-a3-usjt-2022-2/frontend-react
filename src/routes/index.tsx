import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PageError } from "../pages/Error";
import { Home } from "../pages/Home";
import { LoginPage } from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <PageError />,
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <PageError />,
  },
  {
    path: "/consults",
    element: <Home />,
    errorElement: <PageError />,
  },
]);

export const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};

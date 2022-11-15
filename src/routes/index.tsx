import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthComponent } from "../components/FC/AuthComponent";
import { PageError } from "../pages/Error";
import { Home } from "../pages/Home";
import { LoginPage } from "../pages/Login";

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
    path: "/consults",
    element: (
      <AuthComponent>
        <Home />
      </AuthComponent>
    ),
    errorElement: <PageError />,
  },
]);

export const Routes: React.FC = () => {
  return <RouterProvider router={router} />;
};

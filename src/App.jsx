import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/auth";
import Dashboard from "./pages/dashboard";
import LandingPage from "./pages/landing";
import RedirectLink from "./pages/redirect-link";
import AppLayout from "./layouts/app-layouts";
import ReduireAuth from "./components/requiredAuth";
import UrlProvider from "./contex";
import Link from "./pages/link";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/dashboard",
        element: (
          <ReduireAuth>
            <Dashboard />
          </ReduireAuth>
        ),
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/link/:id",
        element: (
          <ReduireAuth>
            <Link />
          </ReduireAuth>
        ),
      },
      {
        path: "/:id",
        element: <RedirectLink />,
      },
    ],
  },
]);
const App = () => {
  return (
    <UrlProvider>
      <RouterProvider router={router} />
    </UrlProvider>
  );
};

export default App;

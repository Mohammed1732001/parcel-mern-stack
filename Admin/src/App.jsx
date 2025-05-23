import { createBrowserRouter, RouterProvider, Outlet, Navigate } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Parcels from "./pages/Parcels.jsx";
import Parcel from "./pages/Parcel.jsx";
import Navbar from "./compnante/Navbar.jsx";
import Menue from "./compnante/Menue.jsx";
import Footer from "./compnante/Footer.jsx";
import Users from "./pages/Users.jsx";
import NewParcel from "./pages/NewParcel.jsx";
import NewUser from "./pages/NewUser.jsx";
import Login from "./pages/Login.jsx";
import { useMemo } from "react";
import User from "./pages/user.jsx";


const ProtectedRoute = ({ children }) => {
  const token = useMemo(() => localStorage.getItem("token"), []);
  if (!token) return <Navigate to="/Login" replace />;
  return children;
};

const GuestRoute = ({ children }) => {
  const token = useMemo(() => localStorage.getItem("token"), []);
  if (token) return <Navigate to="/" replace />;
  return children;
};

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="d-flex">
        <div className="w-25">
          <Menue />
        </div>
        <div className="w-75">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/", element: <Home /> },
      { path: "/Parcels", element: <Parcels /> },
      { path: "/newparcel", element: <NewParcel /> },
      { path: "/newuser", element: <NewUser /> },
      { path: "/Parcel/:id", element: <Parcel /> },
      { path: "/User/:id", element: <User /> },
      { path: "/Users", element: <Users /> },
    ],
  },
  {
    path: "/Login",
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

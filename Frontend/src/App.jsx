import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import Home from "./pages/Home.jsx"
import Login from "./pages/Login.jsx"
import MyParcels from "./pages/MyParcels.jsx"
import Parcels from "./pages/Parcels.jsx"
import Parcel from "./pages/Parcel.jsx"
import Statement from "./pages/Statement.jsx" 
import { useSelector } from "react-redux"
// import Statement from "./pages/Statement.jsx"

function App() {
  const user = useSelector((state) => state.user)

  const router = createBrowserRouter([
    {
      path: "/", element: <Home />
    },
    {
      path: "/login", element: <Login />
    },
    {
      path: "/Myparcels", element: user.currentUser ? <MyParcels/> : <Navigate to={"/login"}/>
    },
    {
      path: "/allparcels", element: user.currentUser ? <Parcels /> : <Navigate to={"/login"} />
    },
    {
      path: "/Myparcels/parcel/:id", element: user.currentUser ? <Parcel /> : <Navigate to={"/login"} />
    },
    {
      path: "/statement", element: user.currentUser ? <Statement/> : <Navigate to={"/login"} />
    },
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App

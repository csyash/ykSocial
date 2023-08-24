import "./App.css";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import { AuthProvider, useUserContext } from "./providers/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import Leftbar from "./components/Leftbar/Leftbar";
import Rightbar from "./components/Rightbar/Rightbar";

const PrivateRoutes = ({ children, path }) => {
  const { user } = useUserContext();

  const isLoggedIn = Object.keys(user).length > 0;
  if (path === "login" && isLoggedIn) {
    return <Navigate to={"/"} />;
  }
  if (path === "register" && isLoggedIn) {
    return <Navigate to={"/"} />;
  }
  if (path === "home" && !isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

const Layout = () => {
  return (
    <div style={{ backgroundColor: "whitesmoke" }}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Leftbar />
        <Outlet />
        <Rightbar />
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoutes path={"home"}>
            <Home />,
          </PrivateRoutes>
        ),
      },
      {
        path: "/profile/:username",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PrivateRoutes path={"login"}>
        <Login />
      </PrivateRoutes>
    ),
  },
  {
    path: "/register",
    element: (
      <PrivateRoutes path={"register"}>
        <Register />
      </PrivateRoutes>
    ),
  },
]);

function App() {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
}

export default App;

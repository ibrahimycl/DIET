import Home from "../pages/Home/index";
import Login from "../pages/Auth/login";
import Signup from "../pages/Auth/signup";
import Community from "../pages/Community";
import Packages from "../pages/Packages";
import Profil from "../pages/Profil";
import ProtectedRoute from "./ProtectedRoute";
import Basket from "../pages/Basket";
import Payment from "../pages/Payment";
import Food from "../pages/Food";
import Chat from "../pages/Chat";

const AppRoutes = [
    {
        index:true,
        element: <Home/>
    },
    {
        path:"/auth/login",
        element: 
            <ProtectedRoute>
                <Login />
            </ProtectedRoute>
    },
    {
        path:"/auth/signup",
        element: 
            <ProtectedRoute>
                <Signup />
            </ProtectedRoute>
    },
    {
        path:"/community",
        element: <Community/>
    },
    {
        path:"/packages",
        element: <Packages/>
    },
    {
        path: "/profile",
        element: <Profil />
    },
    {
        path:"/profile/:id",
        element: <Profil/>
    },
    {
        path:"/basket",
        element: <Basket/>
    },
    {
        path:"/payment",
        element: <Payment/>
    },
    {
        path:"/food",
        element: <Food/>
    },
    {
        path:"/chat",
        element: <Chat/>
    }
]

export default AppRoutes;
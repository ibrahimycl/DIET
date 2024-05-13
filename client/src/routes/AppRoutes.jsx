import Home from "../pages/Home/index";
import Login from "../pages/Auth/login";
import Signup from "../pages/Auth/signup";
import Community from "../pages/Community";
import Packages from "../pages/Packages";

const AppRoutes = [
    {
        index:true,
        element: <Home/>
    },
    {
        path:"/auth/login",
        element: <Login/>
    },
    {
        path:"/auth/signup",
        element: <Signup/>
    },
    {
        path:"/community",
        element: <Community/>
    },
    {
        path:"/packages",
        element: <Packages/>
    }
]

export default AppRoutes;
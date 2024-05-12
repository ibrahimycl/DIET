import Home from "../pages/Home/index";
import Login from "../pages/Auth/login";
import Signup from "../pages/Auth/signup";

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
    }
]

export default AppRoutes;
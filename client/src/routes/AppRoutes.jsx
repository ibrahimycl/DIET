import Home from "../pages/Home/index";
import Login from "../pages/Auth/login"

const AppRoutes = [
    {
        index:true,
        element: <Home/>
    },
    {
        path:"/auth/login",
        element: <Login/>
    }
]

export default AppRoutes;
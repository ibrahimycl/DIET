import { useSelector } from "react-redux"

export const useToken = () => useSelector(state => state.authData.token)
export const useAuthData = () => useSelector(state => state.authData.data)
export const useIsLogin = () => useSelector(state => state.authData.isLogin)
export const useUserType = () => useSelector(state => state.authData.userType)
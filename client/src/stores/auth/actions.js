import store from ".."
import { _setAccessToken,_setAuthData,_setLogin,_setLogout,_setUserType } from "."


export const setAccessToken = token => store.dispatch(_setAccessToken(token))
export const setAuthData = data => store.dispatch(_setAuthData(data))
export const setLogin = data => store.dispatch(_setLogin(data))
export const setLogout = () => store.dispatch(_setLogout())
export const setUserType = type => store.dispatch(_setUserType(type))
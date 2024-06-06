import {createSlice} from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialState = {
    isLogin: false,
    token: "",
    userType: "",
    data: null,
  };

export const authData = createSlice({
    name:'auth',
    initialState,
    reducers:{
        _setLogin: (state, action) => {
            Cookies.set('DD_token', action.payload.token);
            Cookies.set('user_type', action.payload.userType );

            state.isLogin = action.payload.isLogin;
            state.token = action.payload.token;
            state.userType = action.payload.userType;
            state.data = action.payload.user;
        },
        _setLogout: (state) => {
            Cookies.remove('DD_token');
            Cookies.remove('user_type');
            state.isLogin = false;
            state.token = "";
            state.userType = "";
            state.data = null;
        },
        _setAccessToken: (state, action) => {
            state.accessToken = action.payload;
        },
        _setAuthData: (state, action) => {
            state.data = action.payload;
        },
        _setUserType: (state, action) => {
            state.userType = action.payload;
        },
    }
})

export const {_setLogin, _setLogout, _setAccessToken, _setAuthData, _setUserType} = authData.actions;

export default authData.reducer;
import { configureStore } from '@reduxjs/toolkit'
import authDataReducer from "./auth"

export default configureStore({
    reducer: {
        authData: authDataReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
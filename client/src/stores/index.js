import { configureStore } from '@reduxjs/toolkit'
import authDataReducer from "./auth"
import chatDataReducer from "./chat"

export default configureStore({
    reducer: {
        authData: authDataReducer,
        chatData: chatDataReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
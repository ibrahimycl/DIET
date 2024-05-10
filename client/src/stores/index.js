import { configureStore } from '@reduxjs/toolkit'
import testDataReducer from "./testStore"

export default configureStore({
    reducer: {
        testData: testDataReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
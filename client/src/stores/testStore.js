import {createSlice} from "@reduxjs/toolkit";


export const testData = createSlice({
    name:'test',
    initialState:{
        test: {},
    },
    reducers:{
        setTest: (state,action) => {
            state.user = action.payload;
        },
    }
})

export const {setTest} = testData.actions;

export default testData.reducer;
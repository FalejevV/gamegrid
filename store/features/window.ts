import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Window{
    width:number
}

const initialState:Window = {
    width:-1
}

const windowSlice = createSlice({
    name:"window",
    initialState,
    reducers:{
        setWidth:((state:Window, action:PayloadAction<number>) => {
            state.width = action.payload
        })
    }
})

export default windowSlice.reducer;

export const { setWidth } = windowSlice.actions
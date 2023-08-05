import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Window{
    width:number,
    displayAuthWindow:boolean,
}

const initialState:Window = {
    width:-1,
    displayAuthWindow:false,
}

const windowSlice = createSlice({
    name:"window",
    initialState,
    reducers:{
        setWidth:((state:Window, action:PayloadAction<number>) => {
            state.width = action.payload
        }),
        toggleAuthWindow:((state:Window, action:PayloadAction<boolean>) => {
            state.displayAuthWindow = action.payload;
        })
    }
})

export default windowSlice.reducer;

export const { setWidth, toggleAuthWindow } = windowSlice.actions
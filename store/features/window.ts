import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Window{
    width:number,
    displayAuthWindow:boolean,
    displayDropdownMenu:boolean,
}

const initialState:Window = {
    width:-1,
    displayAuthWindow:false,
    displayDropdownMenu:false
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
        }),
        toggleDropdownMenu : ((state: Window, action:PayloadAction<boolean>) => {
            state.displayDropdownMenu = action.payload;
        })
    }
})

export default windowSlice.reducer;

export const { setWidth, toggleAuthWindow, toggleDropdownMenu } = windowSlice.actions
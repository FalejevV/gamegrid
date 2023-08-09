import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Window{
    width:number,
    displayAuthWindow:boolean,
    displayDropdownMenu:boolean,
    sidebarHovered:boolean
}

const initialState:Window = {
    width:-1,
    displayAuthWindow:false,
    displayDropdownMenu:false,
    sidebarHovered:false
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
        }),
        toggleSidebarHover : ((state:Window, action:PayloadAction<boolean>) => {
            state.sidebarHovered = action.payload;
        })
    }
})

export default windowSlice.reducer;

export const { setWidth, toggleAuthWindow, toggleDropdownMenu, toggleSidebarHover} = windowSlice.actions
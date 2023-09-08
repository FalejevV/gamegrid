import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SortFilterDropdowns } from "./sortFilter";

interface Window{
    width:number,
    displayAuthWindow:boolean,
    displayDropdownMenu:boolean,
    sidebarHovered:boolean,
    profileMenuDropdown:boolean,
    mobileFilterDropdown:boolean,
    mobileFilterSelected:keyof SortFilterDropdowns | "",
}

const initialState:Window = {
    width:-1,
    displayAuthWindow:false,
    displayDropdownMenu:false,
    sidebarHovered:false,
    profileMenuDropdown:false,
    mobileFilterDropdown:false,
    mobileFilterSelected:""
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
        }),
        toggleProfileMenuDropdown : ((state:Window, action:PayloadAction<boolean>) => {
            state.profileMenuDropdown = action.payload;
        }),
        toggleMobileFilterDropdown : ((state:Window, action:PayloadAction<boolean>) => {
            state.mobileFilterDropdown = action.payload;
        }),
        setMobileFilterSelected: ((state:Window, action:PayloadAction<keyof SortFilterDropdowns | "">) => {
            state.mobileFilterSelected = action.payload;
        })
    }
})

export default windowSlice.reducer;

export const { setWidth, toggleAuthWindow, toggleDropdownMenu, toggleSidebarHover, toggleProfileMenuDropdown, toggleMobileFilterDropdown, setMobileFilterSelected } = windowSlice.actions
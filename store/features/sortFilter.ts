import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface SortFilterDropdownItem{
    isDropdown:boolean,
    selectedItems:string[],
    defaultValue:string[]
}

export interface SortFilterDropdowns{
    tags:SortFilterDropdownItem,
    sort:SortFilterDropdownItem,
    platform:SortFilterDropdownItem,
    players:SortFilterDropdownItem,
    developer:SortFilterDropdownItem
}

export interface SortFilter{
    expand: boolean;
    dropdowns:SortFilterDropdowns,
    amount:number
}

const initialState:SortFilter = {
    expand:false,
    dropdowns:{
        tags: {
            isDropdown: false,
            selectedItems: [],
            defaultValue: [],
        },
        sort: {
            isDropdown: false,
            selectedItems: ["New First"],
            defaultValue: ["New First"],
        },
        platform: {
            isDropdown: false,
            selectedItems: [],
            defaultValue: [],
        },
        players: {
            isDropdown: false,
            selectedItems: [],
            defaultValue: [],
        },
        developer: {
            isDropdown: false,
            selectedItems: [],
            defaultValue: [],
        },
    },
    amount:3
}

const sortFilterSlice = createSlice({
    name:"sortFilter",
    initialState,
    reducers:{
        sortFilterExpand : ((state:SortFilter, action:PayloadAction<boolean>) => {
            state.expand = action.payload;
        }),
        toggleDropdown:((state:SortFilter, action:PayloadAction<{key:keyof SortFilterDropdowns, value:boolean}>) => {
            state.dropdowns[action.payload.key].isDropdown = action.payload.value
        }),
        toggleOption:((state:SortFilter, action:PayloadAction<{key: keyof SortFilterDropdowns, value:string}>) => {
            if(state.dropdowns[action.payload.key].selectedItems.includes(action.payload.value)){
                let newSelectedItems:string[] = [];
                newSelectedItems = state.dropdowns[action.payload.key].selectedItems.filter((item:string) =>  item !== action.payload.value)
                state.dropdowns[action.payload.key].selectedItems = [...newSelectedItems]
            }else{
                if(state.dropdowns[action.payload.key].selectedItems.length >= 3) return;
                
                state.dropdowns[action.payload.key].selectedItems.push(action.payload.value);
                return state
            }
        }),
        clearOptions: ((state:SortFilter, action:PayloadAction<keyof SortFilterDropdowns>) => {
            state.dropdowns[action.payload].selectedItems = [...state.dropdowns[action.payload].defaultValue];
        }),
        clearAllOptions: ((state:SortFilter) => {
            // @ts-ignore 
            const keys: (keyof SortFilterDropdowns)[] = Object.keys(state.dropdowns);
            keys.forEach((key: keyof SortFilterDropdowns) => {
                state.dropdowns[key].selectedItems = [...state.dropdowns[key].defaultValue]
            })
        }),
        toggleAllDropdowns:((state:SortFilter, action:PayloadAction<boolean>) => {
            // @ts-ignore 
            const keys: (keyof SortFilterDropdowns)[] = Object.keys(state.dropdowns);
            keys.forEach((key: keyof SortFilterDropdowns) => {
                state.dropdowns[key].isDropdown = action.payload
            })
        }),
        setAmount: ((state:SortFilter, action:PayloadAction<number>) => {
            state.amount = action.payload
        })
    }
})

export default sortFilterSlice.reducer;


export const {sortFilterExpand, toggleDropdown, toggleOption , clearOptions, clearAllOptions, toggleAllDropdowns, setAmount} = sortFilterSlice.actions 
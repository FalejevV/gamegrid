import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SupabaseSlice{
    userId:string
}

const initialState: SupabaseSlice = {
    userId:"loading"
}

const supabaseSlice = createSlice({
    name: "supabase",
    initialState: initialState,
    reducers: {
        setUserId: ((state:SupabaseSlice, action:PayloadAction<string>) => {
            state.userId = action.payload
        })
    }
})

export default supabaseSlice.reducer;

export const {setUserId} = supabaseSlice.actions;
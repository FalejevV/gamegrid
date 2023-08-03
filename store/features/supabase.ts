import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface SupabaseSlice{
    userId:string | null,
    username:string | null,
    role:number | null,

}

const initialState: SupabaseSlice = {
    userId:"-1",
    username:null,
    role:1
}

const supabaseSlice = createSlice({
    name: "supabase",
    initialState: initialState,
    reducers: {
        setUser: ((state:SupabaseSlice, action:PayloadAction<SupabaseSlice>) => {
            state.userId = action.payload.userId;
            state.username = action.payload.username;
            state.role = action.payload.role;
        }),
    }
})

export default supabaseSlice.reducer;

export const {setUser} = supabaseSlice.actions;
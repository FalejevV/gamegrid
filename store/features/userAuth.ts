import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthSlice{
    userId:string | null,
    username:string | null,
    role:number | null,

}

const initialState: AuthSlice = {
    userId:"-1",
    username:null,
    role:1,
}

const userAuthSlice = createSlice({
    name: "userAuth",
    initialState: initialState,
    reducers: {
        setUser: ((state:AuthSlice, action:PayloadAction<AuthSlice>) => {
            state.userId = action.payload.userId;
            state.username = action.payload.username;
            state.role = action.payload.role;
        })
    }
})

export default userAuthSlice.reducer;

export const {setUser} = userAuthSlice.actions;
import { Game } from "@/interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface GamesStore{
    games: Game[]
}

const initialState = {
    games: []
}


const gamesSlice = createSlice({
    name:"games",
    initialState,
    reducers:{
        setGames: (state:GamesStore, action:PayloadAction<Game[]>) => {
            state.games = action.payload
        },
        pushGames: (state:GamesStore, action:PayloadAction<Game[]>) => {
            state.games.push(...action.payload);
        }
    }
})

export default gamesSlice.reducer;

export const {setGames, pushGames} = gamesSlice.actions;
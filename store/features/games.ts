import { Game } from "@/interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface GamesStore {
    games: Game[]
}

const initialState = {
    games: []
}


const gamesSlice = createSlice({
    name: "games",
    initialState,
    reducers: {
        setGames: (state: GamesStore, action: PayloadAction<Game[]>) => {
            state.games = action.payload
        },
        pushGames: (state: GamesStore, action: PayloadAction<Game[]>) => {
            
            action.payload.forEach((gamePayload: Game) => {
                if (state.games.length === 0) {
                    state.games.push(gamePayload);
                } else {
                    if (state.games.filter((game: Game) => game.id === gamePayload.id).length === 0) {
                        state.games.push(gamePayload);
                    }
                }
            })
        }
    }
})

export default gamesSlice.reducer;

export const { setGames, pushGames } = gamesSlice.actions;
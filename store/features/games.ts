import { Game } from "@/interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface GamesStore {
    games: Game[],
    canBeLoaded:boolean
}

const initialState = {
    games: [],
    canBeLoaded:false
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
        },
        setCanBeLoaded : (state:GamesStore, action:PayloadAction<boolean>) => {
            state.canBeLoaded = action.payload;
        },
        resetGames : (state:GamesStore, action:PayloadAction<[]>) => {
            state.games = action.payload;
            state.canBeLoaded = false;
        }
    }
})

export default gamesSlice.reducer;

export const { setGames, pushGames, setCanBeLoaded, resetGames } = gamesSlice.actions;
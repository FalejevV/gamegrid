import { GameCreationRequiredInfo, IGDBFullGameInfo, IGDBGameFetch, ScoreList } from "@/interface";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface GameCreation {
    page:number,
    gameSearchInput:string,
    gameInfo: GameCreationGameInfo,
    scores: ScoreList,
    fetchedGames: IGDBGameFetch[],
    memoGame:GameCreationGameInfo,
    questions:GameCreationQuestions,
    gameCreationFetchedGame:GameCreationRequiredInfo | null | IGDBFullGameInfo;
}

export interface GameCreationGameInfo {
    gameId: number,
    name: string,
    image: string,
    date:number,
    company:string,
}

export interface GameCreationQuestions{
    finished:boolean,
    hours:string,
    platform:string,
    comment:string,
}

let initialState: GameCreation = {
    page: 0,
    gameSearchInput: "",
    gameInfo: {
        gameId: -1,
        name: "",
        image: "",
        date:-1,
        company:""
    },
    memoGame: {
        gameId: -10,
        name: "memo",
        image: "memo",
        date:-1,
        company:""
    },
    scores: {
        graphics_avg: -1,
        sound_avg: -1,
        gameplay_avg: -1,
        level_avg: -1,
        balance_avg: -1,
        story_avg: -1,
        performance_avg: -1,
        original_avg: -1,
        customization_avg: -1,
        microtransactions_avg: -1,
        support_avg: -1,
        total: -1
    },
    fetchedGames: [],
    questions: {
        finished: false,
        hours: "",
        platform: "",
        comment: ""
    },
    gameCreationFetchedGame: null
}

const gameCreationSlice = createSlice({
    name: "gameCreation",
    initialState,
    reducers: {
        setGameCreationPage: ((state:GameCreation, action:PayloadAction<number>) =>{
            state.page = action.payload;
        }),
        setGameCreationGameData: ((state: GameCreation, action: PayloadAction<GameCreationGameInfo>) => {
            state.gameInfo = {...action.payload}
        }),
        setGameCreationMemoData: ((state: GameCreation, action: PayloadAction<GameCreationGameInfo>) => {
            state.memoGame = {...action.payload};
        }),
        setGameCreationSearchInput: ((state:GameCreation, action:PayloadAction<string>) => {
            state.gameSearchInput = action.payload;
        }),
        setGameCreationFetchedGames: ((state:GameCreation, action:PayloadAction<IGDBGameFetch[]>) => {
            state.fetchedGames = action.payload 
        }),
        clearGameCreationAll:((state:GameCreation) => {
           return initialState 
        }),
        setGameCreationFinished: ((state:GameCreation, action: PayloadAction<boolean>) => {
            state.questions.finished = action.payload   
        }),
        setGameCreationHours: ((state:GameCreation, action: PayloadAction<string>) => {
            state.questions.hours = action.payload;
        }),
        setGameCreationPlatform: ((state:GameCreation, action: PayloadAction<string>) => {
            state.questions.platform = action.payload   
        }),
        setGameCreationComment : ((state:GameCreation, action: PayloadAction<string>) => {
            state.questions.comment = action.payload
        }),
        setGameCreationFetchedGame: ((state:GameCreation, action: PayloadAction<GameCreationRequiredInfo | null | IGDBFullGameInfo> ) => {
            state.gameCreationFetchedGame = action.payload;
        })
    }
})




export default gameCreationSlice.reducer;

export const {setGameCreationPage, setGameCreationGameData, setGameCreationSearchInput, setGameCreationFetchedGames, setGameCreationMemoData, clearGameCreationAll, setGameCreationComment, setGameCreationFinished, setGameCreationHours, setGameCreationPlatform, setGameCreationFetchedGame} = gameCreationSlice.actions;







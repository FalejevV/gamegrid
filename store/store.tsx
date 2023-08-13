import { configureStore } from "@reduxjs/toolkit"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"
import userAuth from "./features/userAuth"
import window from "./features/window"
import sortFilter from "./features/sortFilter"
import gameCreation from "./features/gameCreation"

export const store = configureStore({
  reducer: {
    userAuth:userAuth,
    window:window,
    sortFilter:sortFilter,
    gameCreation: gameCreation
  }
})

// create types for state and dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// use throughout your app instead of useDispatch and useSelector

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
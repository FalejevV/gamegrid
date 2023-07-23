import { configureStore } from "@reduxjs/toolkit"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"
import supabase from "./features/supabase"
import window from "./features/window"
import sortFilter from "./features/sortFilter"

export const store = configureStore({
  reducer: {
    supabase:supabase,
    window:window,
    sortFilter:sortFilter
  }
})

// create types for state and dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// use throughout your app instead of useDispatch and useSelector

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
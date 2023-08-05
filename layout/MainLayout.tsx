"use client"

import { RootState, store, useAppSelector } from "@/store/store"
import { Provider } from "react-redux"
import ServerWrap from "./ServerWrap"
import React, { useMemo } from "react"
import WindowResizeListener from "@/components/WindowResizeListener/WindowResizeListener"
import Header from "./Header"
import Sidebar from "./Sidebar"
import AuthPopUp from "./AuthPopUp"


export default function MainLayout(props:{
    elem:React.ReactNode
}){
  const memoListeners = useMemo(() => {
    return(<>
      <WindowResizeListener />
    </>)
  },[])
    
    return(
        <>
          <Provider store={store}>
              {memoListeners}
              <ServerWrap>
                <Header />
                <Sidebar />
                <main className="min-h-screen max-w-screen pl-[10px] pt-[80px] pr-[10px] overflow-hidden sm:pl-[100px]">
                  {props.elem}
                </main>
              </ServerWrap>
          </Provider>
        </>
    )
}
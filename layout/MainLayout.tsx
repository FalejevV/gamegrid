"use client"

import { store } from "@/store/store"
import { Provider } from "react-redux"
import ServerWrap from "./ServerWrap"
import React, { useMemo } from "react"
import WindowResizeListener from "@/components/WindowResizeListener/WindowResizeListener"
import Header from "./Header"
import Sidebar from "./Sidebar"


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
                <div className="w-full sm:h-[70px] h-[60px]" />
                <main className="min-h-screen max-h-screen h-fit max-w-screen pl-[10px] k:pt-[30px] pt-[10px] pb-[150px] pr-[10px] md:pl-[100px] overflow-x-hidden">
                  {props.elem}
                </main>
              </ServerWrap>
          </Provider>
        </>
    )
}
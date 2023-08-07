"use client"

import { RootState, useAppSelector } from "@/store/store"
import GamePreviewTitle from "../GamePreviewBlocks/GamePreviewTitle"
import GamePreviewTags from "@/layout/GamePreviewTags"


export default function GamePreviewItemLS(){

    function PCItemLayout(){
        return(
            <div className="w-full max-w-[950px] h-[300px] flexgap flex-col overflow-hidden brightness-[40%]">
            <header className="flexgap w-full h-[34px] items-center">
                <div className="flex gap-[30px] h-full flex-auto bg-gray-400 items-center px-3 "/>
                <div className="flex gap-[30px] h-full flex-auto bg-gray-400 items-center px-3 "/>
            </header>
    
            <main className="flexgap w-full h-[256px] relative">
                <div className="flex-auto h-full max-w-[400px] bg-gray-400"/>
                <section className="flexgap flex-col flex-auto">
    
                    <div className="h-[158px] leading-[24px] bg-gray-400"/>
    
                    <div className="flexgap flex-auto">
                            <div className="flex-auto bg-gray-400" />
                            <div className="flex-auto bg-gray-400" />
                            <div className="flex-auto bg-gray-400" />
                    </div>
    
                </section>
            </main>
        </div>
        )
    }
    
    function TabletItemLayout(){
        return(
            <div className="w-full max-w-[770px] h-[344px] flexgap flex-col overflow-hidden brightness-[40%]">
            <header className="flexgap flex-col w-full h-[78px] items-center">
                <div className="w-full gap-[30px] h-full flex-auto bg-gray-400 items-center px-3 "/>
                <div className="w-full gap-[30px] h-full flex-auto bg-gray-400 items-center px-3 "/>
            </header>
    
            <main className="flexgap w-full h-[256px] relative">
                <div className="flex-auto h-full max-w-[400px] bg-gray-400"/>
                <section className="flexgap flex-col flex-auto">
    
                    <div className="h-[158px] leading-[24px] bg-gray-400"/>
    
                    <div className="flexgap flex-auto bg-gray-400"/>
    
                </section>
            </main>
        </div>
        )
    }

    function MobileItemLayout(){
        return(
            <div className="w-full max-w-[770px] h-[360px] flexgap flex-col overflow-hidden brightness-[40%]">
            <header className="flexgap flex-col w-full h-[34px]">
                <div className="w-full gap-[30px] h-full flex-auto bg-gray-400 items-center px-3 "/>
            </header>
    
            <main className="flexgap w-full h-[320px] relative flex-col">
                <div className="flex-auto h-full bg-gray-400"/>
                <div className="absolute right-[5px] top-[5px] z-30">
                    <div className="w-full gap-[30px] h-full flex-auto bg-gray-400 items-center px-3 "/>
                </div>
    
                <section className="flexgap flex-auto flex-col h-[100px]">
                    <div className="w-full gap-[30px] h-full flex-auto bg-gray-400 items-center px-3 "/>
                    <div className="w-full gap-[30px] h-full flex-auto bg-gray-400 items-center px-3 "/>
                </section>
            </main>
        </div>
        )
    }
    


   

    const windowSelector = useAppSelector((state:RootState) => state.window)


    if(windowSelector.width !== -1) return(
        <>
            {windowSelector.width > 880 ? PCItemLayout() : 
            windowSelector.width < 600 ? MobileItemLayout() : TabletItemLayout()}
        </>
    )
}
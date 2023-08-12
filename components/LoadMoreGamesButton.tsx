"use client"

import { FilterQueryParams } from "@/interface";


export default function LoadMoreGamesButton({searchParams}:{
    searchParams:FilterQueryParams
}){ 

    
    async function getMoreGames(){
        fetch('/api/games', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...searchParams
            }),
          }).then(res => res.json()).then(data => console.log(data));
    }
    

    return (
        <button className="bg-dimm textcol-main py-[5px] px-[10px]" onClick={getMoreGames}>
            Load More
        </button>
    )
}
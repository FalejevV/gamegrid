import { toggleDropdownMenu } from "@/store/features/window";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store"



export default function MenuBurger(){

    const windowSelector = useAppSelector((state:RootState) => state.window);
    const dispatch = useAppDispatch();
    
    function toggleMenu(){
        dispatch(toggleDropdownMenu(!windowSelector.displayDropdownMenu));
    }

    if(windowSelector.width === -1){
        return;
    }

    return(
        <div className="min-w-[40px] min-h-[40px] max-w-[40px] max-h-[40px] mr-[30px] ml-[5px] flex flex-col justify-center gap-[10px] cursor-pointer" onClick={toggleMenu}>
            <span className={`w-full h-[3px] bg-hi transition-all duration-300
                ${windowSelector.displayDropdownMenu && "translate-y-[13px] rotate-[135deg]"}
            `}/>

            <span className={`w-full h-[3px] bg-hi transition-all duration-300
                ${windowSelector.displayDropdownMenu && "opacity-0"}
            `}/>

            <span className={`w-full h-[3px] bg-hi transition-all duration-300
                ${windowSelector.displayDropdownMenu && "-translate-y-[13px] -rotate-[135deg]"}
            `}/>
        </div>
    )
}
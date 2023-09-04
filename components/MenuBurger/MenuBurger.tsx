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
        <div className="min-w-[30px] min-h-[30px] max-w-[30px] max-h-[30px] flex flex-col justify-center gap-[8px] cursor-pointer" onClick={toggleMenu}>
            <span className={`w-full h-[3px] bg-hi transition-all duration-300
                ${windowSelector.displayDropdownMenu && "translate-y-[10px] rotate-[135deg]"}
            `}/>

            <span className={`w-full h-[3px] bg-hi transition-all duration-300
                ${windowSelector.displayDropdownMenu && "opacity-0"}
            `}/>

            <span className={`w-full h-[3px] bg-hi transition-all duration-300
                ${windowSelector.displayDropdownMenu && "-translate-y-[12px] -rotate-[135deg]"}
            `}/>
        </div>
    )
}
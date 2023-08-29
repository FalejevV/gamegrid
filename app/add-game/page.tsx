
import AddGameForm from "@/layout/AddGameForm";
import supabaseServer from "@/utils/supabaseServer";


export default async function AddGame(){
    const supabase = supabaseServer()
    const {data} = await supabase.auth.getUser();

    if(!data.user){
        return(
            <div className="w-full flex flex-col gap-[40px] items-center justify-center">
                <p className="text-lg text-yellow-50">You need do sign in to view this page</p>
            </div>
        )
    }
    


    return (
        <div className="w-full flex justify-center">
            <AddGameForm />
       </div>
    )
}

"use client"
import WideActionButton from "@/components/Buttons/WideActionButton/WideActionButton";
import InputField from "@/components/InputField/InputField"
import { FormEvent, useState } from "react"


export default function EditProfileForm(props:{
    username:string
}){
    const [username, setUsername] = useState(props.username);

    function formSubmit(e:FormEvent){
        e.preventDefault();
        alert("FAKE SAVE");
    }

    return(
        <form className="flexgap flex-col" onSubmit={formSubmit}>
            <InputField label={"Username"} name={"username"} placeholder={"Username"} value={username} setValue={setUsername} />
            <WideActionButton submit onClick={() => {}} text={"SUBMIT"} />
        </form>
    )
}
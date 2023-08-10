"use client"

import { AuthSession } from '@supabase/supabase-js';
import supabaseClient from "@/utils/supabaseClient";
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { setUser } from '@/store/features/userAuth';

export default function AuthListener(){

    const dispatch = useAppDispatch();
    const userSelector = useAppSelector((state:RootState) => state.userAuth);

    supabaseClient.auth.onAuthStateChange(async (event: string, session: AuthSession | null) => {
        if(session === null){
            dispatch(setUser({
                userId: null,
                username: null,
                role: null
            }));
        }else{
            if(session.user.id && userSelector.userId !== session.user.id){
                supabaseClient.from('profile').select().eq('id', session.user.id).single().then(res => {
                    dispatch(setUser({
                        userId: res.data.id,
                        username: res.data.username,
                        role: res.data.role
                    }))
                });
            }
        }
    });

    return null;
}
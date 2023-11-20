import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from "./app.hooks";
import {
    readUserData,
    StartPageState,
    syncUser
} from "./store/slices/startpage.slice"
import {useNavigate} from "react-router-dom";

const TelegramUserData = () => {
    const state = useAppSelector<StartPageState>((state) => state.startPage)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(readUserData())
    }, []);

    useEffect(() => {
        if(state.status === 'idle' && state.user) {
            dispatch(syncUser(state.user))
            navigate("/account")
        } else {}
    })

    return (
        <div>
            {state.user ? (
                <div>
                    <h2>Telegram User Data</h2>
                    <p>id: {state.user.id}</p>
                    <p>Name: {state.user.firstName}</p>
                    <p>Last Name: {state.user.firstName}</p>
                    <p>Username: {state.user.username}</p>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
};

export default TelegramUserData;

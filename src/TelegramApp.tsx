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
    }, [dispatch]);

    useEffect(() => {
        if(state.telegramBrowser && state.status === 'idle' && state.user) {
            dispatch(syncUser(state.user))
            navigate("/account")
        }
    })

    const buildMessage = () => {
        if(!state.telegramBrowser) {
            return (
                <p> This app working only inside telegram application :(</p>
            )
        } else if(state.user) {
            return (<p>Last Name: {state.user.id}</p>)
        } else {
            return (<p>Loading user data...</p>)
        }
    }

    return (
        <div style={{
            background: state.theme?.bg_color,
            color: state.theme?.text_color,
            display: "flex",
            width: "100%"
        }}>
            { buildMessage() }
        </div>
    );
};

export default TelegramUserData;

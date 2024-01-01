import {
    createSlice,
    createAsyncThunk,
    ActionReducerMapBuilder
} from '@reduxjs/toolkit';
import { UserData } from "../../types";
import {API_USER_LIST} from "../../consts";
import {Application} from "../../tg.miniapp/application";
import { UserStorage } from "../../storage/user.storage"

export interface Theme {
    bg_color: string,
    text_color: string,
    hint_color: string
    link_color: string
    button_color: string
    button_text_color: string
    secondary_bg_color: string
}
export interface StartPageState {
    status: 'done' | 'error' | 'pending' | 'idle'
    user?: UserData
    theme?: Theme
    telegramBrowser: boolean
}

const initialState: StartPageState = {
    status: "idle",
    telegramBrowser: true
}

export const syncUser = createAsyncThunk<UserData, UserData>(
    "user/sync",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await fetch(API_USER_LIST, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            if(!response.ok) {
                throw new Error("Network error")
            }
            return await response.json()
        } catch (e: any) {
            console.log(e.message)
            return rejectWithValue(e.message);
        }
    }
)

const startPageSlice = createSlice({
    initialState: initialState,
    name: "startPageSlice",
    reducers: {
        readUserData: (state: StartPageState) => {
            const app = new Application()
            let newState = {...state}
            if(!app.isMiniApp()) {
                newState.telegramBrowser = false
                return newState
            }
            let data: string = decodeURI(window.Telegram.WebApp.initData)
            let dataItems = data.split("&")
            const userData = dataItems.filter((item: string) => {
                if(item.search("user=") !== -1) {
                    return item
                }
                return undefined
            })
            const userStorage = new UserStorage();
            if(userData.length > 0) {
                console.log({user: userData})
                const raw = userData[0].replace("user=", "")
                const decoded = JSON.parse(decodeURIComponent(raw))
                newState.user = { id: decoded["id"] }
                userStorage.add(decoded["id"])
            } else {
                const queryParams = window.location.href
                    .split('?')[1] // query at right side
                    .split('#')[0] // query at left side

                const params = new window.URLSearchParams(queryParams)
                const userId = params.get('userId')
                if(userId) {
                    console.log(userId)
                    newState.user = {id: userId}
                    userStorage.add(userId)
                }
            }
            let themeData = JSON.parse(window.Telegram.WebView.initParams.tgWebAppThemeParams);
            const theme: Theme = {...themeData};
            return {...newState, theme: theme};
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<StartPageState>) => {
        builder
            .addCase(syncUser.pending, (state: StartPageState) => {
                state.status = "pending"
            })
            .addCase(syncUser.fulfilled, (state: StartPageState, action: any) => {
                state.status = "done"
                state.user = action.payload
            })
            .addCase(syncUser.rejected, (state: StartPageState) => {
                state.status = "error"
            })
    }
})

export const { readUserData } = startPageSlice.actions;
export default startPageSlice.reducer;
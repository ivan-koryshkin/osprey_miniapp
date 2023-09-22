import {
    createSlice,
    createAsyncThunk,
    ActionReducerMapBuilder
} from '@reduxjs/toolkit';
import { UserData } from "../../types";
import {API_USER_LIST} from "../../consts";


export interface StartPageState {
    status: 'done' | 'error' | 'pending' | 'idle'
    user?: UserData
}

const initialState: StartPageState = {
    status: "idle"
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
            return rejectWithValue(e.message);
        }
    }
)

const startPageSlice = createSlice({
    initialState: initialState,
    name: "startPageSlice",
    reducers: {
        readUserData: (state: StartPageState) => {
            let data: string = decodeURI(window.Telegram.WebApp.initData)
            let dataItems = data.split("&")
            const userData = dataItems.filter((item: string) => {
                if(item.search("user=") !== -1) {
                    return item
                }
                return undefined
            })
            if(userData) {
                const raw = userData[0].replace("user=", "")
                const decoded = JSON.parse(decodeURIComponent(raw))
                console.log(decoded)
                state.user = {
                    id: decoded["id"],
                    firstName: decoded["first_name"],
                    lastName: decoded["last_name"],
                    username: decoded["username"]
                }
            }
        }
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
import {
    createSlice,
    createAsyncThunk,
    ActionReducerMapBuilder
} from "@reduxjs/toolkit";
import { AccountData } from "../../types";
import {API_ACCOUNT_LIST} from "../../consts";


export interface AccountListPage {
    status: 'done' | 'error' | 'pending' | 'idle'
    accountList?: AccountData[]
}

const initialState: AccountListPage = {
    status: 'idle'
}

export const fetchAccountList = createAsyncThunk<AccountListPage> (
    "account/list",
    async (_,{ rejectWithValue }) => {
        try {
            const response = await fetch(API_ACCOUNT_LIST, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if(!response.ok) {
                throw new Error("Network error")
            }
            return await response.json()
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)

const accountListPageSlice = createSlice({
    initialState: initialState,
    name: "accountListPageSlice",
    reducers: {
        clear: (state: AccountListPage) => {
            state.accountList = undefined
            state.status = 'idle'
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<AccountListPage>) => {
        builder
            .addCase(
                fetchAccountList.pending,
                (state: AccountListPage) => {
                    state.status = 'pending'
                }
            )
            .addCase(
                fetchAccountList.fulfilled,
                (state: AccountListPage, action: any) => {
                    state.status = 'done'
                    state.accountList = action.payload
                })
            .addCase(
                fetchAccountList.rejected,
                (state: AccountListPage) => {
                    state.status = 'error'
            })
    }
})

export const { clear } = accountListPageSlice.actions;
export default accountListPageSlice.reducer;
import {
    createSlice,
    createAsyncThunk,
    ActionReducerMapBuilder
} from "@reduxjs/toolkit";
import { CategoryData } from "../../types";
import {API_ACCOUNT_LIST} from "../../consts";



export interface CategoryListPage {
    status: 'done' | 'error' | 'pending' | 'idle'
    categoryList?: CategoryData[]
}

const initialState: CategoryListPage = {
    status: "idle"
}

export const fetchCategoryList = createAsyncThunk<CategoryListPage, string> (
    "product/list",
    async (accountId: string, { rejectWithValue }) => {
        try {
            const url = `${API_ACCOUNT_LIST}/${accountId}/category`
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log('new version of reducer v0')
            if(!response.ok) {
                throw new Error("Network error")
            }
            return await response.json()
        } catch (e: any) {
            return rejectWithValue(e.message)
        }
    }
)

const categoryListPageSlice = createSlice({
    initialState: initialState,
    name: "productListPageSlice",
    reducers: {
        clear: (state: CategoryListPage) => {
            state.categoryList = undefined
        }
    },
    extraReducers: (builder: ActionReducerMapBuilder<CategoryListPage>) => {
        builder
            .addCase(
                fetchCategoryList.pending,
                (state: CategoryListPage) => {
                    state.status = "pending"
                }
            )
            .addCase(
                fetchCategoryList.fulfilled,
                (state: CategoryListPage, action: any) => {
                    console.log('new version of reducer')
                    return {
                        ...state,
                        status: "done",
                        categoryList: action.payload.categories
                    }
                }
            )
            .addCase(
                fetchCategoryList.rejected,
                (state: CategoryListPage) => {
                    state.status = "error"
                }
            )
    }
})

export const { clear } = categoryListPageSlice.actions;
export default categoryListPageSlice.reducer;
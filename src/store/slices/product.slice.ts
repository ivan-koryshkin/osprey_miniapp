import {
    createSlice,
    createAsyncThunk,
    ActionReducerMapBuilder, PayloadAction
} from "@reduxjs/toolkit";
import {ProductData, CartItem} from "../../types";
import {API_ACCOUNT_LIST} from "../../consts";
import {CartStorage} from "../../storage/cart.storage";


interface ProductFetchParams {
    accountId: string
    categoryId: string
}

export interface ProductListPage {
    status: 'done' | 'error' | 'pending' | 'idle'
    productList?: ProductData[]
    cart: CartItem[]
}

const initialState: ProductListPage = {
    status: "idle",
    cart: [],
}

export const fetchProductList = createAsyncThunk<ProductListPage, ProductFetchParams> (
    "product/list",
    async (params: ProductFetchParams, { rejectWithValue }) => {
        try {
            const url = `${API_ACCOUNT_LIST}/${params.accountId}/category/${params.categoryId}`
            console.log({
                url: url
            })
            const response = await fetch(url, {
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

const productListPageSlice = createSlice({
    initialState: initialState,
    name: "productListPageSlice",
    reducers: {
        clear: (state: ProductListPage) => {
            state.productList = undefined
        },
        addToCart: (state: ProductListPage, action: PayloadAction<ProductData>) => {
            const cart = new CartStorage();
            state.cart = cart.addItem(action.payload)
        },
        removeFromCart: (state: ProductListPage, action: PayloadAction<ProductData>) => {
            const cart = new CartStorage();
            state.cart = cart.removeItem(action.payload);
        },
    },
    extraReducers: (builder: ActionReducerMapBuilder<ProductListPage>) => {
        builder
            .addCase(
                fetchProductList.pending,
                (state: ProductListPage) => {
                    state.status = "pending"
                }
            )
            .addCase(
                fetchProductList.fulfilled,
                (state: ProductListPage, action: any) => {
                    state.status = "done";
                    state.productList = action.payload;
                    const cart = new CartStorage()
                    state.cart = cart.deserialize()
                }
            )
            .addCase(
                fetchProductList.rejected,
                (state: ProductListPage) => {
                    state.status = "error"
                }
            )
    }
})

export const {
    clear,
    addToCart,
    removeFromCart
} = productListPageSlice.actions;
export default productListPageSlice.reducer;
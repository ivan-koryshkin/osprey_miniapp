import {
    createSlice,
    createAsyncThunk,
    ActionReducerMapBuilder, PayloadAction
} from "@reduxjs/toolkit";
import {CartItem, ProductData} from "../../types";
import {CartStorage} from "../../storage/cart.storage";


export interface PageState {
    showCart: boolean
    cart: CartItem[]
}


const pageSlice = createSlice({
    name: "page/slice",
    initialState: {
        showCart: false,
        cart: []
    },
    reducers: {
        changeCartVisibility: (state: PageState) => {
            const storage = new CartStorage();
            state.showCart = !state.showCart;
            state.cart = storage.deserialize();
        },
        cartAdd: (state: PageState, action: PayloadAction<ProductData>) => {
            const storage = new CartStorage();
            state.cart = storage.inc(action.payload);
        },
        cartRemove: (state: PageState, action: PayloadAction<ProductData>) => {
            const storage = new CartStorage();
            state.cart = storage.dec(action.payload);
        }
    }
})


export const {
    changeCartVisibility,
    cartAdd,
    cartRemove
} = pageSlice.actions;
export default pageSlice.reducer;
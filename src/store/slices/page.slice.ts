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

const initialState = {
    showCart: false,
    cart: []
}

const pageSlice = createSlice({
    name: "page/slice",
    initialState: initialState,
    reducers: {
        changeCartVisibility: (state: PageState) => {
            const storage = new CartStorage();
            state.showCart = !state.showCart;
            state.cart = storage.deserialize();
        },
        cartAdd: (state: PageState, action: PayloadAction<ProductData>) => {
            const storage = new CartStorage();
            state.cart = storage.addItem(action.payload);
        },
        cartRemove: (state: PageState, action: PayloadAction<ProductData>) => {
            const storage = new CartStorage();
            state.cart = storage.removeItem(action.payload);
        },
        incrementProduct: (state: PageState, action: PayloadAction<string>) => {
            const storage = new CartStorage();
            state.cart = storage.increment(action.payload);
        },
        decrementProduct: (state: PageState, action: PayloadAction<string>) => {
            const storage = new CartStorage();
            state.cart = storage.decrement(action.payload);
        },
        sendCartToBot: (state: PageState) => {
            const storage = new CartStorage();
            storage.sendData()
            state.cart = []
        }
    }
})


export const {
    changeCartVisibility,
    cartAdd,
    cartRemove,
    incrementProduct,
    decrementProduct,
    sendCartToBot
} = pageSlice.actions;
export default pageSlice.reducer;
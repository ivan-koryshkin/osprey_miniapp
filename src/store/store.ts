import startPageSlice from "./slices/startpage.slice";
import accountSlice from "./slices/account.slice";
import productSlice from "./slices/product.slice";
import categorySlice from "./slices/category.slice";
import {configureStore} from '@reduxjs/toolkit';
import pageSlice from "./slices/page.slice";

export const store = configureStore({
    reducer: {
        startPage: startPageSlice,
        accountPage: accountSlice,
        categoryPage: categorySlice,
        productPage: productSlice,
        rootPage: pageSlice,
    }
})

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
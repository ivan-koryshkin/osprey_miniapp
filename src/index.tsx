import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import TelegramApp from "./TelegramApp";
import { AccountList } from "./component/accounts.compponent"
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from "react-router-dom";
import {store} from './store/store'
import {ProductList} from "./component/product.component";
import {CategoryList} from "./component/category.component";

declare global {
    interface Window {
        Telegram: any;
    }
}


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <HashRouter>
            <Routes>
                <Route path="/" element={ <TelegramApp /> } />
                <Route path="/account" element={ <AccountList/> } />
                <Route path="/account/:accountId/category" element={ <CategoryList/> } />
                <Route path="/account/:accountId/category/:categoryId" element={ <ProductList/> } />
            </Routes>
        </HashRouter>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

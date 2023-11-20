import React, { useEffect } from 'react';
import {Card, List} from 'antd'
import { useAppSelector, useAppDispatch } from "../app.hooks";
import {
    AccountListPage,
    fetchAccountList
} from "../store/slices/account.slice";
import {useNavigate} from "react-router-dom";
import {AccountData} from "../types";
import "../styles/card.component.css"
import {WebAppPage} from "./page.component";


export const AccountList = () => {
    const state = useAppSelector<AccountListPage>((state) => state.accountPage)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        console.log('Account component')
        dispatch(fetchAccountList())
        console.log('Account component')
    }, []);

    const buildList = () => {
        return (
            <List
                itemLayout="vertical"
                dataSource={state.accountList}
                renderItem={
                    (account: AccountData) => (
                        <List.Item>
                            <Card
                                size="small"
                                title={
                                    <div className="card-title">
                                        {account.name}
                                    </div>
                                }
                                onClick={ () => {
                                    navigate(`/account/${account.id}/category`)
                                }}
                            >
                                <div className="card-description">
                                    <p>Content</p>
                                </div>
                            </Card>
                        </List.Item>
                    )
                }
            />
        )
    }

    return (
        <WebAppPage>
            <h3>HUI</h3>
            {buildList()}
        </WebAppPage>
    )
}

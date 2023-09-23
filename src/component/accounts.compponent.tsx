import React, { useEffect } from 'react';
import {Card, Col, List, Row} from 'antd'
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
    const rowSize = 1;
    const state = useAppSelector<AccountListPage>((state) => state.accountPage)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchAccountList())
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
            {buildList()}
        </WebAppPage>
    )
}

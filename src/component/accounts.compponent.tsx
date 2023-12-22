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
import { Application } from "../tg.miniapp/application"
import { Loader } from "./loader.component";
import { AppList } from "./applist.component";


export const AccountList = () => {
    const state = useAppSelector<AccountListPage>((state) => state.accountPage)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const app = new Application()

    useEffect(() => {
        dispatch(fetchAccountList())
    }, [dispatch]);

    const buildList = () => {
        if(state.status === 'pending') {
            return (<Loader/>)
        }
        return (
            <AppList
                dataSource={state.accountList}
                renderItem={
                    (account: AccountData) => (
                        <List.Item>
                            <Card
                                style={{...app.getSecondaryStyle()}}
                                size="small"
                                bordered={false}
                                title={
                                    <div style={{...app.getHeaderStyle()}}>
                                        <h3>{account.name}</h3>
                                    </div>
                                }
                                onClick={ () => {
                                    navigate(`/account/${account.id}/category`)
                                }}
                            >
                                <div className="card-description">
                                    <p> Content </p>
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

import React, { useEffect } from 'react';
import { Card, Col, Row } from 'antd'
import { useAppSelector, useAppDispatch } from "../app.hooks";
import {
    AccountListPage,
    fetchAccountList
} from "../store/slices/account.slice";
import {useNavigate} from "react-router-dom";
import {AccountData} from "../types";


export const AccountList = () => {
    const rowSize = 1;
    const state = useAppSelector<AccountListPage>((state) => state.accountPage)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchAccountList())
    }, []);

    const buildList = () => {
        if(state.accountList) {
            const rows: AccountData[][] = Array.from(
                {
                    length: Math.ceil(state.accountList.length / rowSize)
                },
                (_, index) => {
                    if(state.accountList) {
                        return state.accountList.slice(index * rowSize, (index + 1) * rowSize)
                    } else {
                        return []
                    }
                }
            );
            return rows.map((accounts: AccountData[]) => {
                const cols = accounts.map((account: AccountData) => {
                    return (
                        <Col id={account.id} span={8}>
                            <Card
                                size="small"
                                title={account.name}
                                style={{ width: 300, marginBottom: 16 }}
                                onClick={ () => {
                                    navigate(`/account/${account.id}/category`)
                                }}
                            >
                                <p>Card content</p>
                            </Card>
                        </Col>
                    )
                })
                return (
                    <Row gutter={[16, 16]}>
                        {cols}
                    </Row>
                )
            })
        } else {
            return []
        }
    }

    return (
        <div>
            <ul>{buildList()}</ul>
        </div>
    )
}

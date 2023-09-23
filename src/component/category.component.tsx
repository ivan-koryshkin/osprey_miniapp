import React, { useEffect } from "react";
import {Card, Col, List, Row} from 'antd'
import { useAppSelector, useAppDispatch } from "../app.hooks";
import {
    fetchCategoryList,
    CategoryListPage,
} from "../store/slices/category.slice";
import { CategoryData } from "../types";
import {useNavigate, useParams} from "react-router-dom";
import {WebAppPage} from "./page.component";
import "../styles/card.component.css"


export const CategoryList = () => {
    const rowSize = 1;
    const state = useAppSelector<CategoryListPage>(state => state.categoryPage)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { accountId } = useParams()

    useEffect(() => {
        console.log({accountId: accountId})
        if(accountId) {
            dispatch(fetchCategoryList(accountId))
        }
    }, []);

    const buildList = () => {
        return (
            <List
                itemLayout="vertical"
                dataSource={state.categoryList}
                renderItem={(category: CategoryData) => (
                    <List.Item>
                        <Card
                            size="small"
                            title={
                                <div className="card-title">
                                    {category.name}
                                </div>
                            }
                            onClick={ () => {
                                navigate(`/account/${accountId}/category/${category.id}`)
                            }}
                        >
                            <div className="card-description">
                                {category.description}
                            </div>
                        </Card>
                    </List.Item>
                )}
            />
        )
    }

    return (
        <WebAppPage>
            {buildList()}
        </WebAppPage>
    )
}
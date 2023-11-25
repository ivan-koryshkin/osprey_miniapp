import React, {useEffect} from "react";
import {Card, List} from 'antd'
import {useAppDispatch, useAppSelector} from "../app.hooks";
import {
    CategoryListPage,
    fetchCategoryList,
} from "../store/slices/category.slice";
import {CategoryData} from "../types";
import {useNavigate, useParams} from "react-router-dom";
import {WebAppPage} from "./page.component";
import "../styles/card.component.css"
import {Application} from "../tg.miniapp/application";


export const CategoryList = () => {
    const state = useAppSelector<CategoryListPage>(state => state.categoryPage)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { accountId } = useParams()
    const app = new Application()

    useEffect(() => {
        if(accountId) {
            dispatch(fetchCategoryList(accountId))
        }
    }, [dispatch, accountId]);

    const buildList = () => {
        return (
            <List
                itemLayout="vertical"
                dataSource={state.categoryList ? state.categoryList : []}
                renderItem={(category: CategoryData) => (
                    <List.Item>
                        <Card
                            style={{...app.getSecondaryStyle()}}
                            size="small"
                            bordered={false}
                            title={
                                <div style={{...app.getHeaderStyle()}}>
                                    {category.name}
                                </div>
                            }
                            onClick={ () => {
                                navigate(`/account/${accountId}/category/${category.id}`)
                            }}
                        >
                            <div>
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
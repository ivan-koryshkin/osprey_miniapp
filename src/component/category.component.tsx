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


export const CategoryList = () => {
    const state = useAppSelector<CategoryListPage>(state => state.categoryPage)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { accountId } = useParams()

    useEffect(() => {
        if(accountId) {
            dispatch(fetchCategoryList(accountId))
        }
    }, []);

    const buildList = () => {
        console.log({
            categoryList: state.categoryList
        })
        if(state.categoryList) {
            for (let i in state.categoryList) {
                if (!state.categoryList) {
                    continue
                }
                const category = state.categoryList[i];
                console.log({name: category.name})
                console.log({description: category.description})
                console.log({id: category.id})
            }
        }
        return (
            <List
                itemLayout="vertical"
                dataSource={state.categoryList ? state.categoryList : []}
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
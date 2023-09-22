import React, { useEffect } from "react";
import {Button, Card, Col, Row} from 'antd'
import { useAppSelector, useAppDispatch } from "../app.hooks";
import {
    fetchCategoryList,
    CategoryListPage,
} from "../store/slices/category.slice";
import { CategoryData } from "../types";
import {useNavigate, useParams} from "react-router-dom";
import {BackButton} from "./backbutton.component";
import {MinusOutlined, PlusOutlined} from "@ant-design/icons";


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
        if(state.categoryList) {
            const rows: CategoryData[][] = Array.from(
                {
                    length: Math.ceil(state.categoryList.length / rowSize)
                },
                (_, index) => {
                    if(state.categoryList) {
                        return state.categoryList.slice(index * rowSize, (index + 1) * rowSize)
                    } else {
                        return []
                    }
                }
            );
            return rows.map((categories: CategoryData[]) => {
                const cols = categories.map((category: CategoryData) => {
                    return (
                        <Col id={category.id} span={8}>
                            <Card
                                size="small"
                                title={category.name}
                                style={{ width: 300, marginBottom: 16 }}
                                onClick={ () => {
                                    navigate(`/account/${accountId}/category/${category.id}`)
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
            {buildList()}
            <BackButton/>
        </div>
    )
}
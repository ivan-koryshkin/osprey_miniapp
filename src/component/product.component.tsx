import React, { useEffect } from "react";
import {
    Button,
    Card,
    FloatButton,
    Modal,
    Table,
    List
} from 'antd'
import { useAppSelector, useAppDispatch } from "../app.hooks";
import {
    addToCart,
    fetchProductList,
    ProductListPage, removeFromCart,
} from "../store/slices/product.slice";
import {ProductData} from "../types";
import {useParams} from "react-router-dom";
import {
    MinusOutlined,
    PlusOutlined
} from "@ant-design/icons";
import { CartStorage } from '../storage/cart.storage'
import { WebAppPage } from "./page.component";
import '../styles/product.component.css'
import '../styles/card.component.css'


export const ProductList = () => {
    const state = useAppSelector<ProductListPage>(state => state.productPage)
    const dispatch = useAppDispatch()
    const { accountId, categoryId } = useParams()
    const storage = new CartStorage();

    useEffect(() => {
        if(accountId && categoryId) {
            dispatch(fetchProductList({
                accountId: accountId,
                categoryId: categoryId
            }))
        }
    }, []);

    const buildList = () => {
        return (
            <List
                dataSource={state.productList ? state.productList : []}
                renderItem={(product: ProductData) => (
                    <List.Item>
                        <Card
                            size="small"
                            title={
                                <div className="card-title">
                                    {product.name}
                                </div>
                            }
                        >
                            <div className="card-description">
                                <p>{product.description}</p>
                            </div>
                            <div className="product-cart-price">
                                <p>{product.price}</p>
                            </div>
                            <div className="product-cart-controls">
                                <Button
                                    icon={<PlusOutlined />}
                                    style={{width: '25%'}}
                                    onClick={ () => {
                                        dispatch(addToCart(product))
                                    }}
                                />
                                <div className="product-cart-count">
                                    {storage.count(product.id)}
                                </div>
                                <Button
                                    icon={<MinusOutlined />}
                                    style={{width: '25%', marginRight: 'auto'}}
                                    onClick={ () => {
                                        dispatch(removeFromCart(product))
                                    }}
                                />
                            </div>
                        </Card>
                    </List.Item>
                )}
                itemLayout="vertical"
            />
        )
    }

    return (
        <WebAppPage>
            {buildList()}
        </WebAppPage>
    )
}
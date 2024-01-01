import React, { useEffect } from "react";
import {
    Button,
    Card,
    List
} from 'antd'
import { useAppSelector, useAppDispatch } from "../app.hooks";
import {
    addToCart,
    fetchProductList,
    ProductListPage, removeFromCart
} from "../store/slices/product.slice";
import {ProductData} from "../types";
import {useParams} from "react-router-dom";
import {
    MinusOutlined,
    PlusOutlined,
} from "@ant-design/icons";
import { CartStorage } from '../storage/cart.storage'
import { WebAppPage } from "./page.component";
import '../styles/product.component.css'
import '../styles/card.component.css'
import {Application} from "../tg.miniapp/application";
import { Loader } from "./loader.component";
import { AppList } from "./applist.component";

export const ProductList = () => {
    const state = useAppSelector<ProductListPage>(state => state.productPage)
    const dispatch = useAppDispatch()
    const { accountId, categoryId } = useParams()
    const storage = new CartStorage();
    const app = new Application()

    useEffect(() => {
        if(accountId && categoryId) {
            dispatch(fetchProductList({
                accountId: accountId,
                categoryId: categoryId
            }))
        }
    }, [dispatch, accountId, categoryId]);

    const buildList = () => {
        if(state.status === 'pending') {
            return (<Loader/>)
        }
        return (
            <AppList
                dataSource={
                    Array.isArray(state.productList) ? state.productList : []
                }
                renderItem={(product: ProductData) => (
                    <List.Item>
                        <Card
                            size="small"
                            style={{...app.getSecondaryStyle()}}
                            title={
                                <div style={{...app.getHeaderStyle()}}>
                                    {product.name}
                                </div>
                            }
                            bordered={false}
                        >
                            <div className="card-description">
                                <p>{product.description}</p>
                            </div>
                            <div className="product-cart-price">
                                <p>{product.price} GEL</p>
                            </div>
                            <div className="product-cart-controls">
                                <Button
                                    icon={<PlusOutlined/>}
                                    style={{...app.getButtonStyle(), width: '25%'}}
                                    onClick={ () => {
                                        dispatch(addToCart(product))
                                    }}
                                >
                                    Add
                                </Button>
                                <div className="product-cart-count">
                                    {storage.count(product.id)}
                                </div>
                                <Button
                                    icon={<MinusOutlined />}
                                    style={{...app.getButtonStyle(), width: '25%', marginRight: 'auto'}}
                                    onClick={ () => {
                                        dispatch(removeFromCart(product))
                                    }}
                                >
                                    Remove
                                </Button>
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
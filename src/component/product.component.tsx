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
    ProductListPage, removeFromCart, switchModal,
} from "../store/slices/product.slice";
import {CartItem, ProductData} from "../types";
import {useNavigate, useParams} from "react-router-dom";
import {
    MinusOutlined,
    PlusOutlined,
    ShoppingCartOutlined
} from "@ant-design/icons";
import { CartStorage } from '../storage/cart.storage'
import type { ColumnsType } from 'antd/es/table';
import {BackButton} from "./backbutton.component";


interface DataType {
    key: React.Key;
    name: string;
    count: number;
    price: number;
}


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

    const cartContent = () => {
        const columns: ColumnsType<DataType> = [
            {
                title: 'Name',
                dataIndex: 'name',
                width: 30,
            },
            {
                title: 'Count',
                dataIndex: 'count',
                width: 30,
            },
            {
                title: 'Price',
                dataIndex: 'price',
                width: 30
            },
        ]

        const data: DataType[] = state.cart.map((item: CartItem) => {
            return {
                key: item.productId,
                name: item.name,
                count: item.count,
                price: 0
            }
        })

        return (
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 240 }}
            />
        )
    }

    const buildList = () => {
        return (
            <List
                dataSource={state.productList ? state.productList : []}
                renderItem={(product: ProductData) => (
                    <List.Item>
                        <Card size="small" title={product.name} style={{ width: '100%', marginBottom: 16 }}>
                            <p>{product.description}</p>
                            <p>{product.price}</p>
                            <Button
                                icon={<PlusOutlined />}
                                style={{width: '25%'}}
                                onClick={ () => {
                                    dispatch(addToCart(product))
                                }}
                            />
                            {storage.count(product.id)}
                            <Button
                                icon={<MinusOutlined />}
                                style={{width: '25%', marginRight: 'auto'}}
                                onClick={ () => {
                                    dispatch(removeFromCart(product))
                                }}
                            />
                        </Card>
                    </List.Item>
                )}
                itemLayout="vertical"
            />
        )
    }

    return (
        <div style={{ width: "100%" }}>
            {buildList()}
            <BackButton/>
            <FloatButton
                icon={<ShoppingCartOutlined />}
                onClick={() => dispatch(switchModal())}
            />;
            <Modal
                title="Basic Modal"
                open={state.showCart}
                onOk={ () => dispatch(switchModal()) }
                onCancel={ () => dispatch(switchModal())}
            >
                {cartContent()}
            </Modal>
        </div>
    )
}
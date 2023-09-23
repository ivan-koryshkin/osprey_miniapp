import React from 'react'
import {ColumnsType} from "antd/es/table";
import {CartItem} from "../types";
import {Table} from "antd";

interface DataType {
    key: React.Key;
    name: string;
    count: number;
    price: number;
}

interface CartProps {
    products: CartItem[]
}

export const Cart: React.FC<CartProps> = (props: CartProps) => {
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

    const data: DataType[] = props.products.map((item: CartItem) => {
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
            pagination={false}
            scroll={{ y: 240 }}
        />
    )
}
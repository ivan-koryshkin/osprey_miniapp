import React from 'react'
import {CartItem} from "../types";
import {Button, Card, List} from "antd";

import "../styles/cart.component.css"


interface CartProps {
    products: CartItem[]
    onAdd: (productId: string) => void
    onRemove: (productId: string) => void
}

export const Cart: React.FC<CartProps> = (props: CartProps) => {
    return (
        <List
            itemLayout="vertical"
            dataSource={props.products}
            renderItem={(item: CartItem) => (
                <List.Item>
                    <Card
                        size="small"
                        title={
                            <div className="cart-item-name">
                                {item.name}
                            </div>
                        }
                    >
                        <div className="cart-item-container">
                            <div className="card-description">
                                <span className="cart-item-content">
                                    x{item.count}: 0
                                </span>
                                <Button
                                    type="primary"
                                    onClick={ () => props.onAdd(item.productId) }
                                >+</Button>
                                <Button
                                    type="primary"
                                    danger
                                    onClick={ () => props.onRemove(item.productId) }
                                >-</Button>
                            </div>
                        </div>
                    </Card>
                </List.Item>
            )}
        />
    )
}
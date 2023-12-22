import React from 'react'
import {CartItem} from "../types";
import {Button, Card, List} from "antd";

import "../styles/cart.component.css"
import {Application} from "../tg.miniapp/application";
import { AppList } from "./applist.component";

interface CartProps {
    products: CartItem[]
    onAdd: (productId: string) => void
    onRemove: (productId: string) => void
}

export const Cart: React.FC<CartProps> = (props: CartProps) => {
    const app = new Application()
    return (
        <AppList
            dataSource={props.products}
            renderItem={(item: CartItem) => (
                <List.Item>
                    <Card
                        bordered={false}
                        style={{...app.getSecondaryStyle()}}
                        size="small"
                        title={
                            <div style={{...app.getSecondaryStyle()}}>
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
                                    style={{...app.getButtonStyle()}}
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
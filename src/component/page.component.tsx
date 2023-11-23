import React, {ReactNode} from 'react';
import {BackButton} from "./backbutton.component";
import {useAppDispatch, useAppSelector} from "../app.hooks";
import {FloatButton, Modal, Layout, Button} from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {
    changeCartVisibility, decrementProduct,
    incrementProduct,
    PageState, sendCartToBot
} from "../store/slices/page.slice";
import {Cart} from './cart.component'
import "../styles/webappPage.component.css"
import {Application} from "../tg.miniapp/application";
const {Footer, Content} = Layout;

export interface WebAppPageProps {
    children: ReactNode;
}

export const WebAppPage: React.FC<WebAppPageProps> = ({ children }) => {
    const state = useAppSelector<PageState>(state => state.rootPage)
    const dispatch = useAppDispatch()
    const app = new Application()
    const style = app.getStyle()
    const btnStyle = app.getButtonStyle()

    const increment = (productId: string) => {
        dispatch(incrementProduct(productId))
    }

    const decrement = (productId: string) => {
        dispatch(decrementProduct(productId))
    }

    const onOk = () => {
        dispatch(changeCartVisibility())
        dispatch(sendCartToBot())
    }
    return (
        <div style={{...state.style}}>
            <Layout className="webapp-page-container">
                <Content className="webapp-page-content">
                    {children ? children : []}
                    <FloatButton
                        icon={<ShoppingCartOutlined />}
                        onClick={() => dispatch(changeCartVisibility()) }
                    />
                    <Modal
                        title={
                            <div style={{...style}}>Cart</div>
                        }
                        // open={state.showCart}
                        // onOk={ () => onOk() }
                        onCancel={ () => dispatch(changeCartVisibility())}
                        styles={{
                            header: { ...style },
                            body: { ...style },
                            footer: { ...style },
                            content: { ...style }
                        }}
                        footer={
                            <div>
                                <Button style={{...btnStyle}} onClick={ () => onOk() }>Ok</Button>
                                <Button style={{...btnStyle}} onClick={ () => dispatch(changeCartVisibility()) }>Cancel</Button>
                            </div>
                        }
                    >
                        <Cart
                            products={state.cart}
                            onAdd={increment}
                            onRemove={decrement}
                        />
                    </Modal>
                </Content>
                <Footer className="webapp-page-footer">
                    <BackButton/>
                </Footer>
            </Layout>
        </div>
    )
}
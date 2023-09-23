import React, {ReactNode} from 'react';
import {BackButton} from "./backbutton.component";
import {useAppDispatch, useAppSelector} from "../app.hooks";
import {FloatButton, Modal, Layout} from "antd";
import {ShoppingCartOutlined} from "@ant-design/icons";
import {changeCartVisibility, PageState} from "../store/slices/page.slice";
import {Cart} from './cart.component'
import "../styles/webappPage.component.css"
const {Footer, Content} = Layout;

export interface WebAppPageProps {
    children: ReactNode;
}

export const WebAppPage: React.FC<WebAppPageProps> = ({ children }) => {
    const state = useAppSelector<PageState>(state => state.rootPage)
    const dispatch = useAppDispatch()

    return (
        <Layout className="webapp-page-container">
            <Content className="webapp-page-content">
                {children}
                <FloatButton
                    icon={<ShoppingCartOutlined />}
                    onClick={() => dispatch(changeCartVisibility())}
                />
                <Modal
                    title="Cart"
                    open={state.showCart}
                    onOk={ () => dispatch(changeCartVisibility()) }
                    onCancel={ () => dispatch(changeCartVisibility())}
                >
                    <Cart products={state.cart}/>
                </Modal>
            </Content>
            <Footer className="webapp-page-footer">
                <BackButton/>
            </Footer>
        </Layout>
    )
}
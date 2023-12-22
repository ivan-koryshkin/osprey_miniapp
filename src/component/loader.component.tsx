import { Spin } from 'antd';

import '../styles/loader.component.css'


export const Loader = () => {
    return (
        <div className="webapp-loader-container">
            <div className="webapp-loader">
                <Spin size="large"/>
            </div>
        </div>
    )
}
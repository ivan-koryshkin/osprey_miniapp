import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "antd";
import { Application } from "../tg.miniapp/application";
import { APP_ROOT_URL } from '../consts'

import "../styles/backbutton.component.css"



export const BackButton = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const application = new Application();
    const style = application.getButtonStyle()

    const isApplicationRoot = () => {
        return location.pathname === APP_ROOT_URL
    }

    const resolveRedirect = () => {
        if(isApplicationRoot()) {
            application.close()
        }
        navigate(-1)
    }

    return (
        <div className="back-button">
            <Button
                style={{...style, width: '100%'}}
                onClick={ resolveRedirect }
            >
                { isApplicationRoot() ? 'Close' : 'Back' }
            </Button>
        </div>
    )
}
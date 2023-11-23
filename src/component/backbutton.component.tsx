import {useNavigate} from "react-router-dom";
import { Button } from "antd";
import { Application } from "../tg.miniapp/application";
import "../styles/backbutton.component.css"



export const BackButton = () => {
    const navigate = useNavigate()
    const application = new Application();
    const style = application.getButtonStyle()
    return (
        <div className="back-button">
            <Button
                style={{...style, width: '100%'}}
                onClick={ () => navigate(-1)}
            >
                Back
            </Button>
        </div>
    )
}
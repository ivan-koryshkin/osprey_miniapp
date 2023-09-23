import {useNavigate} from "react-router-dom";
import {Button} from "antd";
import "../styles/backbutton.component.css"

export const BackButton = () => {
    const navigate = useNavigate()
    return (
        <div className="back-button">
            <Button
                style={{width: '100%'}}
                onClick={ () => navigate(-1)}
            >
                Back
            </Button>
        </div>
    )
}
import {useNavigate} from "react-router-dom";
import {Button} from "antd";

export const BackButton = () => {
    const navigate = useNavigate()
    return (
        <Button
            style={{width: '100%'}}
            onClick={ () => navigate(-1)}
        >
            Back
        </Button>
    )
}
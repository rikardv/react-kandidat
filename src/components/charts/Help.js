import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

export function Info(props) {

    return (
        <Tooltip
            title={props.text}
            style={{ position: "relative", top: "10px", right: "-10px" }}
        >
            <IconButton>
                <InfoIcon sx={{ color: "#11636C" }} />
            </IconButton>
        </Tooltip>
    );
}

export function Help(props) {

    return (
        <Tooltip
            title={props.text}
            style={{ backgroundColor: "#11636C", position: "absolute", top: "12%", right: "18vw" }}
        >
            <IconButton>
                <QuestionMarkIcon sx={{ color: "white" }} />
            </IconButton>
        </Tooltip>
    );
}
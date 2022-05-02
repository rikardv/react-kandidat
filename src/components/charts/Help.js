import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

export function Help(props) {
    let x = props.x;
    let y = props.y;
    let position = props.position
    if (!position) position = "absolute";
    if (!x) x = "17.5%";
    if (!y) y = "70px";

    if (props.info) {

        return (
            <Tooltip
                title={props.text}
                style={{ position: position, top: y, right: x }}
            >
                <IconButton>
                    <InfoIcon sx={{ color: "#11636C" }} />
                </IconButton>
            </Tooltip>
        );
    }

    return (
        <Tooltip
            title={props.text}
            style={{ backgroundColor: "#11636C", position: position, top: y, right: x }}
        >
            <IconButton>
                <QuestionMarkIcon sx={{ color: "white" }} />
            </IconButton>
        </Tooltip>
    );
}
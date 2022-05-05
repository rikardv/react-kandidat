import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import InfoIcon from '@mui/icons-material/Info';
import { useTheme, IconButton, Tooltip } from '@mui/material';

export function Info({ text }) {
  const theme = useTheme();
  return (
    <Tooltip
      title={text}
      style={{
        position: 'relative',
        top: '10px',
        right: '-10px',
      }}
    >
      <IconButton>
        <InfoIcon sx={{ color: theme.palette.primary.main }} />
      </IconButton>
    </Tooltip>
  );
}

export function Help({ text }) {
  const theme = useTheme();
  return (
    <Tooltip
      title={text}
      style={{
        backgroundColor: theme.palette.primary.main,
        position: 'absolute',
        top: '12%',
        right: '18vw',
      }}
    >
      <IconButton>
        <QuestionMarkIcon sx={{ color: 'white' }} />
      </IconButton>
    </Tooltip>
  );
}

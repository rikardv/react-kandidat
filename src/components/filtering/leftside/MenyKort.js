import Card from '@mui/material/Card';
import { Typography, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/* Skapad 2022-03-30 */
/* Version: 3       */
/* --------------------------------- FUNKTIONSBESKRIVNING-----------------------------------------------------
  - Funktionen skapar ett Card med typsnitt och storlek h3 och fontWeight medium. I Card hämtar vi rubriken med hjälp av 
    props.rubrik som är det vi skickar in när vi kallar på funktionen. 
  - Tar även in flagged som prop för att visa varningsfärg istället
*/

export default function MenyKort(props) {
  const theme = useTheme();

  const getColor = () => {
    if (props.flagged) {
      return theme.palette.error;
    }
    return theme.palette.primary;
  };
  return (
    <Card
      sx={{
        width: 175,
        margin: 1,

        bgcolor: () =>
          props.activeIndex == props.index ? getColor().main : 'white',
        color: props.activeIndex == props.index ? 'white' : 'black',
        borderRadius: 2,
        textAlign: 'center',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onClick={() => props.setActiveIndex(props.index)}
    >
      <CardContent>
        <Typography variant='h3'>{props.rubrik}</Typography>
      </CardContent>
    </Card>
  );
}

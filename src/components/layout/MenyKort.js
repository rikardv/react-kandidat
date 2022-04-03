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
        width: 'fit-content',
        maxWidth: 200,
        margin: 1,
        boxShadow: `5px 5px 2px 1px ${getColor().light}`,
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
        {/*Denna Typography används för rubrikerna.*/}
        <Typography variant='h3' fontWeight='medium' gutterBottom>
          {props.rubrik}
        </Typography>
        {/*Denna Typography används för "Flaggade kurser" där vi läser in en siffra som ska visas.*/}
        <Typography variant='h1' fontWeight='bold' marginTop={1}>
          {props.antal}
        </Typography>
      </CardContent>
    </Card>
  );
}

import { useState } from 'react';
import Card from '@mui/material/Card';
import { Typography, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';

/* Skapad 2022-03-30 */
/* Version: 2       */
/* --------------------------------- FUNKTIONSBESKRIVNING-----------------------------------------------------
  - Funktionen skapar först en Box med färgen props.color (det är den här färgen vi skickar in när vi kallar på funktionen) 
    som är själva skuggan till rutan.
  - Kortet består i övrigt av ett Card med typsnitt och storlek h3 och fontWeight medium. I Card hämtar vi rubriken med hjälp av 
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
        boxShadow: `10px 10px 2px 1px ${getColor().light}`,
        height: '6.5rem',
        bgcolor: () => (props.active ? getColor().dark : 'white'),
        color: props.active ? 'white' : 'black',
        borderRadius: 2,
        marginLeft: -1,
        textAlign: 'center',
        cursor: 'pointer',
        userSelect: 'none',
      }}
      onClick={() => props.setActiveIndex(props.index)}
    >
      <CardContent>
        {/*Denna Typography används för rubrikerna.*/}
        <Typography variant="h3" fontWeight="medium" gutterBottom>
          {props.rubrik}
        </Typography>
        {/*Denna Typography används för "Flaggade kurser" där vi läser in en siffra som ska visas.*/}
        <Typography variant="h1" fontWeight="bold" marginTop={1}>
          {props.antal}
        </Typography>
      </CardContent>
      {/*Definierar våra states (det här ska ändra färgen på Card till primary och texten till vit och sen tillbaka).
          När man trycker på "Flaggade kurser" ska den dock inte skifta färg utan då ska den öppna en "sida", se Figma.*/}
      {/*Skapar en knapp för att toggla state. (Hela objektet ska vara en knapp när vi fått det att funka.)*/}
    </Card>
  );
}

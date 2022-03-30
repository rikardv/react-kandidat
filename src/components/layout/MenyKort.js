import * as React from "react";
import Card from "@mui/material/Card";
import { Typography, CardContent, Box, Button } from "@mui/material";
import ToggleMenyKort from "./ToggleMenyKort.js";

/* Skapad 2022-03-30 */
/* Version: 1       */
/* --------------------------------- FUNKTIONSBESKRIVNING-----------------------------------------------------
  - Funktionen skapar först en Box med färgen props.color (det är den här färgen vi skickar in när vi kallar på funktionen) 
    som är själva skuggan till rutan.
  - Kortet består i övrigt av ett Card med typsnitt och storlek h3 och fontWeight medium. I Card hämtar vi rubriken med hjälp av 
    props.rubrik som är det vi skickar in när vi kallar på funktionen. 
  - Vidare har vi en Button som används för att ändra state på en ruta till aktiv eller inaktiv. Detta görs med hjälp av 
    funktionen ToggleMenyKort som definieras i ToggleMenyKort.js.
*/

/*---------------------------------------- TO DO-----------------------------------------------------
  Det som behövs göras är att fixa till så att färgen byts när den är aktiv. Behöver även ändra färgerna till "primary" osv 
  när vi kallar på funktionen men får inte riktigt till det. 
  Osäker om bgcolor är rätt, har testat color och backgroundcolor men inget av det funkar.
    
  Behöver även fixa så att det blir bindestreck när rubriken är för bred. Alternativt att vi hårdkodar det
  (detta kan göras genom att skriva BETYGS-FÖRDELNING i App.js när vi kallar på funktionen MenyKort). 
    
  Vi behöver också veta om något state är aktivt, isåfall ska de andra bli inaktiva.
*/

export default function MenyKort(props) {
  /*Kallar på funktionen ToggleMenyKort() för att kunna toggla den aktiva "rutan"*/
  const [isSelected, toggleISelected] = ToggleMenyKort();
  return (
    <Box
      sx={{
        width: "8.4rem",
        height: "7rem",
        borderRadius: 2,
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : props.color,
        m: 1,
      }}
    >
      <Card
        sx={{
          width: "8.4rem",
          height: "6.5rem",
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "#fff",
          borderRadius: 2,
          marginLeft: -1,
          textAlign: "center",
        }}
      >
        <CardContent>
          {/*Denna Typography används för rubrikerna.*/}
          <Typography variant="h3" fontWeight="medium">
            {props.rubrik}
          </Typography>
          {/*Denna Typography används för "Flaggade kurser" där vi läser in en siffra som ska visas.*/}
          <Typography variant="h1" fontWeight="bold" marginTop={1}>
            {props.antal}
          </Typography>
        </CardContent>
        {/*Definierar våra states (det här ska ändra färgen på Card till primary och texten till vit och sen tillbaka).
          När man trycker på "Flaggade kurser" ska den dock inte skifta färg utan då ska den öppna en "sida", se Figma.*/}
        {isSelected ? "I am inactive!" : "I am active!"}
        {/*Skapar en knapp för att toggla state. (Hela objektet ska vara en knapp när vi fått det att funka.)*/}
        <Button variant="contained" onClick={toggleISelected}></Button>
      </Card>
    </Box>
  );
}

import { useState, useCallback } from "react";

/* Skapad 2022-03-30 */
/* Version: 1       */
/* --------------------- FUNKTIONSBESKRIVNING---------------------------------
  Funktion för att toggla "menykorten" i syfte att visa vilken som är aktiv.
*/

export default function ToggleMenyKort(initialState = false) {
  const [state, setState] = useState(initialState);
  const toggle = useCallback(() => {
    setState((v) => !v);
  }, []);
  return [state, toggle];
}

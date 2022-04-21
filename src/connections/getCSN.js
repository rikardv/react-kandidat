export default async function (programkod, startdatum) {
  /**
   * Hämtar hur många HP en person har och hur många den läst med program och startdatum som parameter
   */
  var CSN;

  await fetch(
    'http://localhost:8080' +
      `/program/CSN?${programkod}&startdatum=${startdatum}`,
    {
      method: 'GET',
    }
  )
    .then((response) => response.json())
    .then((response) => {
      CSN = response;
    })
    .catch((err) => console.log('Error fetching test endpoint', err));

  return CSN;
}

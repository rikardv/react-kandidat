export default async function (programkod, startdatum) {
  /**
   * Hämtar hur många HP en person har och hur många den läst med program och startdatum som parameter
   */
  var HP;

  await fetch(
    'http://localhost:8080' +
      `/program/HP?${programkod}&startdatum=${startdatum}`,
    {
      method: 'GET',
    }
  )
    .then((response) => response.json())
    .then((response) => {
      HP = response;
    })
    .catch((err) => console.log('Error fetching test endpoint', err));

  return HP;
}

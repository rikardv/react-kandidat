export default async function (programkod, startdatum) {
  /**
   * Hämtar personer med släpande kurser med program och startdatum som parameter
   */
  var HP;

  await fetch(
    'http://localhost:8080' +
      `/program/HP?program=${programkod}&startdatum=${startdatum}`,
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

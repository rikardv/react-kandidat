export default async function (programkod, startdatum) {
  
  /**
  * Hämtar personer med släpande kurser med program och startdatum som parameter
  */
  var slapande;

  await fetch(
    'http://localhost:8080' +
      `/program/slapande?program=${programkod}&startdatum=${startdatum}`,
    {
      method: 'GET',
    }
  )
    .then((response) => response.json())
    .then((response) => {
      slapande = response;
    })
    .catch((err) => console.log('Error fetching test endpoint', err));

  return slapande;
}

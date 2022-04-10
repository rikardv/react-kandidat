export default async function (programkod) {
  /**
   * Hämtar personer med släpande kurser med program och startdatum som parameter
   */
  var datum;

  await fetch(
    'http://localhost:8080' + `/program/datum?program=${programkod}`,
    {
      method: 'GET',
    }
  )
    .then((response) => response.json())
    .then((response) => {
      datum = response;
    })
    .catch((err) => console.log('Error fetching program datum endpoint', err));

  return datum;
}

export default async function (kurskod, startdatum) {
  var dagar;

  await fetch(
    'http://localhost:8080' +
      `/kurser/dagar?${kurskod}&startdatum=${startdatum}`,
    {
      method: 'GET',
    }
  )
    .then((response) => response.json())
    .then((response) => {
      dagar = response;
    })
    .catch((err) => console.log('Error fetching test endpoint', err));

  return dagar;
}

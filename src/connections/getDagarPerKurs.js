export default async function (startdatum, kurskod) {
  var dagar;

  await fetch(
    'http://localhost:8080' + `/kurser/avslut?${startdatum}&kurskod=${kurskod}`,
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

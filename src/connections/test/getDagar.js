export default async function (kurskod) {
  var dagar;

  await fetch('http://localhost:8080' + `/kurser/avslut?kurskod=${kurskod}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      dagar = response;
    })
    .catch((err) => console.log('Error fetching test endpoint', err));

  return dagar;
}

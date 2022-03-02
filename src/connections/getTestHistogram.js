export default async function () {
  var avbrott;

  await fetch('http://localhost:8080' + `/test/avbrott`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      avbrott = response;
    })
    .catch((err) => console.log('Error fetching test endpoint', err));

  return avbrott;
}

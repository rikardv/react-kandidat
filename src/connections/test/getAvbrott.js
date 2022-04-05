export default async function (program, startDatum, slutDatum) {
  var avbrott;

  await fetch(
    'http://localhost:8080' +
      `/test/avbrott?program=${program}&startDatum=${startDatum}&slutDatum=${slutDatum}`,
    {
      method: 'GET',
    }
  )
    .then((response) => response.json())
    .then((response) => {
      avbrott = response;
    })
    .catch((err) => console.log('Error fetching avbrott endpoint', err));

  return avbrott;
}

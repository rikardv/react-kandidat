export default async function (program, startDatum, slutDatum) {
  var avhopp;

  await fetch(
    'http://localhost:8080' +
      `/kurser/avhopp?${program}&startDatum=${startDatum}&slutDatum=${slutDatum}`,
    {
      method: 'GET',
    }
  )
    .then((response) => response.json())
    .then((response) => {
      avhopp = response;
    })
    .catch((err) => console.log('Error fetching avhopp endpoint', err));

  return avhopp;
}

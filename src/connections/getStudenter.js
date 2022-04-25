export default async function (programKod, startDatum) {
  var info;

  await fetch(
    'http://localhost:8080' +
      `/student/?${programKod}&startDatum=${startDatum}`,
    {
      method: 'GET',
    }
  )
    .then((response) => response.json())
    .then((response) => {
      info = response;
    })
    .catch((err) => console.log('Error fetching avhopp endpoint', err));

  return info;
}

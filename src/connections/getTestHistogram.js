export default async function () {
  var news;

  await fetch('http://localhost:8080' + `/test/avbrott`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      news = response;
    })
    .catch((err) => console.log('Error fetching test endpoint', err));

  return news;
}

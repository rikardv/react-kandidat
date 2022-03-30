export default async function (limit) {
  var kursbetyg;

  await fetch('http://localhost:8080' + `/kurser/betyg?limit=${limit}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      kursbetyg = response;
    })
    .catch((err) => console.log('Error fetching test endpoint', err));

  return kursbetyg;
}

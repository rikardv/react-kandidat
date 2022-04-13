export default async function (kursKoder) {
  var kursbetyg;

  await fetch(
    'http://localhost:8080' + `/kurser/betyg?kursKoder=${kursKoder}`,
    {
      method: 'GET',
    }
  )
    .then((response) => response.json())
    .then((response) => {
      kursbetyg = response;
    })
    .catch((err) => console.log('Error fetching test endpoint', err));

  return kursbetyg;
}

export default async function (program) {
  var kursKoder;

  await fetch('http://localhost:8080' + `/program/kurser?program=${program}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      kursKoder = response;
    })
    .catch((err) => console.log('Error fetching test endpoint', err));

  return kursKoder;
}

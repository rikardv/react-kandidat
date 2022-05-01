export default async function (program) {
  var datum;

  await fetch('http://localhost:8080' + `/program/datum?${program}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      datum = response;
    })
    .catch((err) => console.log('Error fetching program datum endpoint', err));

  return datum;
}

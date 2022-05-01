export default async function (kursKod) {
  var info;
  await fetch('http://localhost:8080' + `/kurser/info?kurskod=${kursKod}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((response) => {
      info = response;
    })
    .catch((err) => console.log('Error fetching kursinfo endpoint', err));

  return info;
}

export default async function (person_nummer) {
  var info;

  await fetch(
    'http://localhost:8080' + `/student/resultat?personnummer=${person_nummer}`,
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

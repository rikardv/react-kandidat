export default async function (kurskod) {
  var datum;

  await fetch(
    'http://localhost:8080' + `/kurser/registrering?kurskod=${kurskod}`,
    {
      method: 'GET',
    }
  )
    .then((response) => response.json())
    .then((response) => {
      datum = response;
    })
    .catch((err) =>
      console.log('Error fetching course start dates endpoint', err)
    );

  return datum;
}

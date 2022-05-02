export default async function (kursKoder) {
  var kursbetyg;

  await fetch('http://localhost:8080' + `/kurser/evaliuate?${kursKoder}`, {
    method: 'GET',
  })
    .then((response) => {
      if (!response.ok) {
        return Promise.reject(new Error('Något gick fel'));
      }
      return response.json();
    })

    .then((response) => {
      kursbetyg = response;
    })
    .catch((err) => console.log('Error fetching test endpoint', err));

  return kursbetyg;
}

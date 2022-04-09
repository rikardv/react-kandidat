export default async function () {
  var betyg;

  await fetch("http://localhost:8080" + `/test/betyg`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      betyg = response;
    })
    .catch((err) => console.log("Error fetching test endpoint", err));

  return betyg;
}

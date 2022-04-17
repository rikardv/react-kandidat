export default async function () {
  var betygsfordelning;

  await fetch("http://localhost:8080" + `/betygsfordelning`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
        betygsfordelning = response;
    })
    .catch((err) => console.log("Error fetching test endpoint", err));

    return betygsfordelning;
}

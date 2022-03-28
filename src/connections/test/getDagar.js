export default async function () {
  var dagar;

  await fetch("http://localhost:8080" + `/test/dagar`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      dagar = response;
    })
    .catch((err) => console.log("Error fetching test endpoint", err));

  return dagar;
}

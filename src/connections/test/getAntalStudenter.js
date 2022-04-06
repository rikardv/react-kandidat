export default async function () {
  var antalStudenter;

  await fetch("http://localhost:8080" + `/kurser/antalStudenter`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
      antalStudenter = response.data[0].antal;
    })
    .catch((err) =>
      console.log("Error fetching course start dates endpoint", err)
    );

  return antalStudenter;
}

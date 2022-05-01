export default async function (kurskod) {
    var betygsfordelning;

    let str = "?kurskod[]=" + kurskod[0];

    for (let i = 1; i < kurskod.length; ++i) {
        str += "&kurskod[]=" + kurskod[i];
    }

  await fetch("http://localhost:8080" + `/omtenta` + str, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
        betygsfordelning = response;
    })
    .catch((err) => console.log("Error fetching test endpoint", err));

    return betygsfordelning;
}

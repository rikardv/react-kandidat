export default async function (programkod, kursKoder) {
    var betygsfordelning;

    let str = "programkod[]=" + programkod[0];
    for (let i = 1; i < programkod.length; ++i)
        str += "&programkod[]=" + programkod[i];

    for (let i = 0; i < kursKoder.length; ++i) {
        str += "&kurskod[]=" + kursKoder[i];
    }
    await fetch("http://localhost:8080" + `/betygsfordelning?` + str, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((response) => {
        betygsfordelning = response;
    })
    .catch((err) => console.log("Error fetching test endpoint", err));

    return betygsfordelning;
}

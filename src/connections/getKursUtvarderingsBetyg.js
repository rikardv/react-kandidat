export default async function () {
    var kursbetyg;
  
    await fetch('http://localhost:8080' + `/test/kursutvarderingsbetyg`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((response) => {
        kursbetyg = response;
      })
      .catch((err) => console.log('Error fetching test endpoint', err));
  

      

    return kursbetyg;
  }

export default async function () {
    var programKoder;
  
    await fetch('http://localhost:8080' + `/program/koder`, {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((response) => {
       programKoder = response;
      })
      .catch((err) => console.log('Error fetching test endpoint', err));
  
    return programKoder;
  }
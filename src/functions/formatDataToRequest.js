export default function (data, key) {
  var formBody = [];
  for (var property in data) {
    var encodedValue = encodeURIComponent(data[property]);
    formBody.push(key + '=' + encodedValue);
  }

  formBody = formBody.join('&');
  return formBody;
}

import axios from "axios";

const apiKey = "5e387fd40901507";

axios({
  method: "post",
  url: "https://api.imgur.com/3/image",
  headers: {
    Authorization: "Client-ID " + apiKey,
    Accept: "application/json"
  },
  mimeType: "multipart/form-data",
  async: false,
  crossDomain: true,
  processData: false,
  contentType: false
})
  .then(function(response) {
    console.log(response.data);
  })
  .catch(function(error) {
    console.log(error);
  });

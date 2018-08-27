import axios from "axios";

export const uploadImage = imagePath => {
  const formData = new FormData();
  formData.append("image", imagePath);

  console.log(formData);

  const apiKey = "5e387fd40901507";
  let settings = {
    method: "POST",
    url: "https://api.imgur.com/3/image",
    headers: {
      Authorization: "Client-ID " + apiKey,
      Accept: "application/json"
    },
    data: formData,
    mimeType: "multipart/form-data",
    async: false,
    crossDomain: true,
    processData: false,
    contentType: false
  };
  return axios(settings);
  // .then(function(response) {
  //   console.log(response.data.data.link);
  // })
  // .catch(function(error) {
  //   console.log(error);
  // });
};

const file = document.getElementById("file");
const img = document.getElementById("img");
const url = document.getElementById("url");

const URL = "https://api.imgbb.com/1/upload";
const TOKEN = "deb66d027832ad18f8b8abef8a9c77a5";

file.addEventListener("change", uploadImage);

function uploadImage(e) {
  const formdata = new FormData()
  formdata.append("image", e.target.files[0]);
  
  fetch(`${URL}?key=${TOKEN}`, {
    method: "post",
    body: formdata
  })
  .then(data => data.json())
  .then(data => {
    img.src = data.data.url
    url.innerText = data.data.url
  })
  .catch(() => alert('Error!'))
}


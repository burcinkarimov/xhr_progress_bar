const file = document.getElementById("file");
const img = document.getElementById("img");
const url = document.getElementById("url");

const URL = 'https://api.imgbb.com/1/upload';
const TOKEN = 'deb66d027832ad18f8b8abef8a9c77a5';

file.addEventListener("change", uploadImage);

function uploadImage (e) {
  const progressBar = document.getElementById("progress_bar");

  const xhr = new XMLHttpRequest(); 

  let formData = new FormData();
  formData.append("image", e.target.files[0]);

  xhr.open("POST", `${URL}?key=${TOKEN}`);
  
  xhr.upload.onprogress = function(e) {
    const percentComplete = (e.loaded / e.total) * 100;
    // progressBar.value = percentComplete;
    progressBar.style.width = percentComplete + '%';
    
    if (e.loaded / e.total * 100 === 100) {
      progressBar.style.backgroundColor = 'rgb(15, 241, 7)';
    }
  }
  
  xhr.onreadystatechange = function() {
    if (xhr.status === 200 && xhr.readyState === 4 && xhr.response) {
      const link = JSON.parse(xhr.response).data.url;
      img.src = link;
      url.textContent = link;
    }
    if (xhr.status === 400 || xhr.status === 404) {
      alert("Error");
    }
  }
  
  xhr.send(formData);
  progressBar.value = 0;
}




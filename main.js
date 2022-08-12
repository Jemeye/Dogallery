const URL='https://api.thedogapi.com/v1/images/search?limit=15&api_key=90eb9416-e91c-4ac2-bb56-e85601c69bb4';
const API_KEY = '90eb9416-e91c-4ac2-bb56-e85601c69bb4';
const URL_favourite= 'https://api.thedogapi.com/v1/favourites'
const btn = document.getElementById('boton');
const closeModal = document.getElementById('close-modal');
const openModal = document.getElementById('open-modal');
const modal = document.getElementById("modal");
//crear una instancia de axios para hacer peticiones a la API
const api = axios.create({
	baseURL: 'https://api.thedogapi.com/v1',
	headers: {'X-API-KEY':'90eb9416-e91c-4ac2-bb56-e85601c69bb4'}
}); 

const file = document.getElementById('file-input');
file.addEventListener("change", () => {
  const nameFile = document.querySelector("#name-file");
  nameFile.innerHTML = file.files[0].name;

});

function showModal(){
  modal.classList.toggle("show");
}

// fetch(URL)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         const img = document.querySelector('#perrito');
//         img.src = data[0].url;
// })

function togglefavourite(){
    const home = document.getElementById('home');
    const favourite = document.getElementById('favourite');
    home.classList.toggle('inactive');
    favourite.classList.toggle('inactive');
    
    // const cardError = document.querySelector('#card-error');
    // cardError.classList.add('inactive');
}

function goTofavourite(){
    const home = document.getElementById('home');
    const favourite = document.getElementById('favourite');
    home.classList.toggle('inactive');
    favourite.classList.toggle('inactive');
    dogFavourites();
}

async function aggfavourite(imageId){
  //API CON AXIOS
  const response = await api.post('/favourites', {
    image_id: imageId
  });
  console.log(response);
  dogFavourites();
  togglefavourite();
  //API CON FETCH
    // console.log('agregado a favoritos');
    // const response = await fetch(`${URL_favourite}`, {
    //     method: 'POST', 
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'x-api-key': API_KEY,
    //     },
    //     body: JSON.stringify({image_id: imageId})
    // });
}

async function deletefavourite(imageId){
    console.log('eliminado de favoritos');
    const response = await fetch(`${URL_favourite}/${imageId}`, {
        method: 'DELETE', 
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
        }, 
    });
    console.log(response);
    dogFavourites();
}   

async function fetchDog() {
  const response = await fetch(URL);
  const data = await response.json();
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";
  console.log(data);
  data.forEach((img) => {
    //container
    const containerImg = document.createElement("div");
    containerImg.classList.add("container-img");
    //img
    const imgElement = document.createElement("img");
    imgElement.src = img.url;
    imgElement.alt = "perrito";
    //btn
    const button = document.createElement("button");
    button.classList.add("img-favourite");
    button.onclick = () => aggfavourite(img.id);
    button.innerHTML = '<i class="fas fa-heart"></i>';
    //append
    containerImg.appendChild(imgElement);
    containerImg.appendChild(button);
    gallery.appendChild(containerImg);
  });
}

async function dogFavourites() {
  const response = await fetch(`${URL_favourite}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
    },
  });
  const data = await response.json();
  const gallery = document.getElementById("gallery-favourite");
  gallery.innerHTML = "";
  console.log(data);
  if (response.status === 200) {
    const error = document.getElementById("error");
    error.classList.add("inactive");
    data.forEach((img) => {
        console.log('jj')
        const containerImg = document.createElement("div");
        containerImg.classList.add("container-img");
        //img
        const imgElement = document.createElement("img");
        imgElement.src = img.image.url;
        imgElement.alt = "perrito";
        //btn
        const button = document.createElement("button");
        button.classList.add("img-favourite");
        button.onclick = () => deletefavourite(img.id);
        button.innerHTML = '&times;';
        //append
        containerImg.appendChild(imgElement);
        containerImg.appendChild(button);
        gallery.appendChild(containerImg);
    });
  }
}

async function uploadImage(){
  console.log('entre')
  const form = document.getElementById('form');
  const formData = new FormData(form);
  const response = await fetch("https://api.thedogapi.com/v1/images/upload", {
    method: 'POST',
    headers: {
        'x-api-key': API_KEY,
    },
    body: formData
  });
  const data = await response.json();
  if (response.status !== 201) {
    spanError.innerHTML = `Hubo un error al subir michi: ${response.status} ${data.message}`
  }else {
    console.log("Foto de michi cargada :)");
    console.log({ data });
    console.log(data.url);
    aggfavourite(data.id) //para agregar el michi cargado a favoritos.
    showModal();
} 
}

fetchDog();
// dogFavourites();


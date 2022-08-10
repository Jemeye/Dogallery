console.log('Hello World');

const URL='https://api.thedogapi.com/v1/images/search?limit=15&api_key=90eb9416-e91c-4ac2-bb56-e85601c69bb4';
const btn = document.getElementById('boton');


// fetch(URL)
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         const img = document.querySelector('#perrito');
//         img.src = data[0].url;
// })


function aggFavorite(){
    console.log('agregado a favoritos');
}

async function fetchDog() {
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    const gallery = document.getElementById('gallery');
    let images = `${data.map(img =>`<div class="container-img">
    <img alt="perrito" src="${img.url}">
    <button onclick="aggFavorite()" class="img-favorite"><i class="fas fa-heart"></i></button>
    </div>`).join('')}`;
    console.log(images);
    if(gallery){
        gallery.innerHTML = images;
    }
}

fetchDog();

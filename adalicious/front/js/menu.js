const API_URL = "http://localhost:3000";

//fonction pour recevoir le data des menus
const getData = async (params) => {
  try {
    const response = await fetch(`${API_URL}/menu`)
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Having difficulty connecting to api.", error);
  }
};

//utiliser les url searchparams pour récupérer le nom de l'user dans l'input et le stocker dans
//localstorage pour l'utiliser sur d'autres pages
let paramString = window.location.search;
let searchParams = new URLSearchParams(paramString);
let userInput = searchParams.get("userName");
localStorage.setItem("user",userInput);

document.querySelector("#message").innerHTML = `Bonjour ${userInput} !`

//fonction pour afficher tous les plats du menu 
const loadMenu = async (params) => {
  let data = await getData();
  for (const item of data) {
    document.querySelector("#grid").innerHTML += `<div class="card">
                <h2>${item.image}</h2>
                <h3>${item.plate}</h3>
                <p>${item.description}</p>
                <div class="linkContainer">
                  <a href="../pages/order.html?id=${item.id}">Commander</a>    
                </div>
            </div>`
  };
};
loadMenu();


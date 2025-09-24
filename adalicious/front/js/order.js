const paramString = window.location.search;
let idParams = new URLSearchParams(paramString);
// console.log(idParams);
let id = idParams.get("id");
// console.log("id:", id);

const API_URL = "http://localhost:3000";
const user = localStorage.getItem("user");

document.querySelector("#message").innerHTML = `Merci pour ta commande ${user}`;

//créer une fonction qui récupère le plat avec le id 
const fetchDish = async () => {
  try {
    const response = await fetch(`${API_URL}/menu/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("having prob with api", error);
  };
};
fetchDish();
const data = await fetchDish();
const dish = await data[0];
//fonction qui permet d'afficher les plats commandés dynamiquement
const loadDish = async (params) => {
// console.log("dish",dish);
  document.querySelector("#grid").innerHTML += `<div class="card">
        <h3 class="status">En préparation</h3>
        <h2>${dish.image}</h2>
        <h3>${dish.plate} x 1</h3>
    </div>`;
};
loadDish();

//créer une fonction qui permet d'envoyer les infos commande au serveur à l'affichage de la page
const createOrder = async (dish) => {
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }, //! je précise au serveur que je vais envoyer les data en fromat json
      body: JSON.stringify({
        dish_id: dish.id,
        client_name: user,
        status: false,
      }),
    });
    const data = await response.json();
    alert (`${data.message}`)
  } catch (error) {
    console.log("Having difficulty connecting to api.",error);
  };
};
createOrder(dish);

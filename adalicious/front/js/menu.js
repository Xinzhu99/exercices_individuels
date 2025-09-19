const API_URL = "http://localhost:3000";
//fonction pour recevoir le data des menus
const getData = async (params) => {
  try {
    const response = await fetch(`${API_URL}/menu`)
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Having difficulty connecting to api.")
  }
};

//utiliser les url searchparams pour récupérer le nom de l'user dans l'input
let paramString = window.location.search
let searchParams = new URLSearchParams(paramString)
let userInput = searchParams.get("userName")

document.querySelector("#message").innerHTML = `Bonjour ${userInput}`

//fonction pour afficher tous les plats du menu
const loadMenu = async (params) => {
  let data = await getData()
  let index = 0
  for (const item of data) {
    document.querySelector("#grid").innerHTML += `<div classe="card">
                <h2>${item.image}</h2>
                <h3>${item.plate}</h3>
                <p>${item.description}</p>
                <a data-index=${index} class="orderBtn" href= "../pages/order.html">Commander</a>
            </div>`
    index++
  }
  let selectedDish = []
  const orderBtn = document.querySelectorAll(".orderBtn")
  console.log("buttons", orderBtn)
  for (const btn of orderBtn) {
    btn.addEventListener("click", (event) => {
      console.log("Hello")
      const clikedDish = btn.dataset.index
      selectedDish.push(data[clikedDish])
      console.log(selectedDish)
    })
  }
}
loadMenu()

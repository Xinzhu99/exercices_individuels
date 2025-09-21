const API_URL = "http://localhost:3000";

const loadOrders = async (params) => {
  try {
    const response = await fetch(`${API_URL}/orders`);
    const orders = await response.json();

    showOrders(orders);
    const cancleBtns = document.querySelectorAll(".cancle");
    cancleBtns.forEach((btn) => {
      const deleteIndex = btn.dataset.index;
      btn.addEventListener("click", (event) => {
        console.log(deleteIndex);
        deleteOrders(deleteIndex);
        loadOrders();
      });
    });

    const readyBtns = document.querySelectorAll(".ready");
    readyBtns.forEach((btn) =>{
      const completeIndex = btn.dataset.index;
      btn.addEventListener("click", (event) => {
        console.log(completeIndex);
        completeOrders(completeIndex);
        loadOrders();      
    });
  });
 } catch (error) {
    console.log("Having difficulty connecting to api.", error);
  }
};
loadOrders();
//function affichage des commandes :
function showOrders(orders) {
  document.querySelector("#grid").innerHTML = "";
  let index = 0;
  for (const order of orders) {
    document.querySelector("#grid").innerHTML += `
        <div class="orderCard">
            <h3>Commande de ${order.username}</h3>
            <p>${order.image}</p>
            <p>${order.plate} x 1</p>
            <button class="prep">${order.status}</button>
            <button class="ready" data-index=${index}>Prête</button>
            <button class="cancle" data-index=${index}>Annuler la commande</button>
        </div>`;
    index++;
  }
}
//function deleteOrders
const deleteOrders = async (index) => {
  try {
    const response = await fetch(`${API_URL}/delete/${index}`);
    const newOrders = await response.json();
  } catch (error) {
    console.log("Having difficulty connecting to api.", error);
  }
};

const completeOrders = async (index) => {
  try {
    const response = await fetch(`${API_URL}/complete/${index}`);
    const newOrders = await response.json();
  } catch (error) {
    console.log("Having difficulty connecting to api.", error);
  }
};

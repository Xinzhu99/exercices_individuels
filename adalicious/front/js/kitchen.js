const API_URL = "http://localhost:3000";

const loadOrders = async (params) => {
  try {
    const response = await fetch(`${API_URL}/orders/kitchen`);
    const workingOrders = await response.json();

    showOrders(workingOrders);
    console.log(workingOrders);

    const readyBtns = document.querySelectorAll(".ready");
    readyBtns.forEach((btn) => {                            //*ici ça ne marche pas la syntaxe de boucle for const of, je ne sais pas pk
      btn.addEventListener("click", (event) => {
        const orderId = btn.dataset.index;                  //*dataset.index : car au moment de générer les boutons, j'ai ajouté id.commande dans le dada index
        console.log(orderId);
        completeOrders(orderId);
      });
    });

    const deleteBtns = document.querySelectorAll(".cancle");
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        const orderId = btn.dataset.index;
        deleteOrders(orderId);
        });
      });
  } catch (error) {
    console.log("Having difficulty connecting to api.", error);
  };
};
loadOrders();
//function affichage des commandes :
function showOrders(orders) {
  document.querySelector("#grid").innerHTML = "";
  if (orders.length === 0) {
    document.querySelector("#grid").innerHTML =
      "Pas de commande en préparation.";
  } else {
    for (const order of orders) {
      document.querySelector("#grid").innerHTML += `
        <div class="orderCard">
            <h3>Commande de <span class="client">${order.name}</span></h3>
            <h2>${order.image}</h2>
            <h3>${order.plate} x 1</h3>
            <button class="ready" data-index=${order.id}>Prête</button>
            <button class="cancle" data-index=${order.id}>Annuler la commande</button>
        </div>`;
    }
  }
}
//fonction qui permet d'envoyer le nouveau statu des commandes, recevoir un message alerte et apperler loadOrders pour rafraichir les commandes affichées
const completeOrders = async (id) => {
  try {
    const response = await fetch(`${API_URL}/orders/kitchen/update/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: true }),
    });
    const data = await response.json();
    alert(data.message);
    loadOrders();                                                    //! 
  } catch (error) {
    console.log("Having difficulty connecting to api.", error);
  }
};

const deleteOrders = async (id) => {
  try {
    const response = await fetch(`${API_URL}/orders/kitchen/delete/${id}`, {
      method: "DELETE",
    });
    const data = await response.json();
    alert(data.message);
    loadOrders();
    console.log("commande supprimée",data.deleted);
  } catch (error) {
    console.log("erreur api", error);
  }
};

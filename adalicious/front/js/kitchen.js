const API_URL = "http://localhost:3000";

const loadOrders = async (params) => {
  try {
    const response = await fetch(`${API_URL}/orders/kitchen`);
    const workingOrders = await response.json();

    showOrders(workingOrders);
    console.log(workingOrders);

    const readyBtns = document.querySelectorAll(".ready");
    readyBtns.forEach((btn) =>{
      btn.addEventListener("click", (event) => {
        const orderId = btn.dataset.index;
        console.log(orderId);
        completeOrders(orderId);
    });

    const deleteBtns = document.querySelectorAll(".cancle");
    deleteBtns.forEach((btn) =>{
      btn.addEventListener("click",(event)=>{
      const orderId = btn.dataset.index;
      deleteOrders(orderId);
      })
    })
  });
 } catch (error) {
    console.log("Having difficulty connecting to api.", error);
  }
};
loadOrders();
//function affichage des commandes :
function showOrders(orders) {
  document.querySelector("#grid").innerHTML = "";
  for (const order of orders) {
    document.querySelector("#grid").innerHTML += `
        <div class="orderCard">
            <h3>Commande de ${order.name}</h3>
            <p>${order.image}</p>
            <p>${order.plate} x 1</p>
            <button class="prep">${order.status}</button>
            <button class="ready" data-index=${order.id}>Prête</button>
            <button class="cancle" data-index=${order.id}>Annuler la commande</button>
        </div>`;
  };
};


const completeOrders = async (id) => {
  try {
    const response = await fetch(`${API_URL}/orders/kitchen/update/${id}`,{
      method:"PATCH",
      headers:{"Content-TYpe": "application/json"},
      body:JSON.stringify({status:true}),
    });
    const data = await response.json();
    alert (`${data.message}`);
    loadOrders();
  } catch (error) {
    console.log("Having difficulty connecting to api.", error);
  };
};

const deleteOrders = async (id) => {
  try {
    const response = await fetch(`${API_URL}/orders/kitchen/delete/${id}`,{
      method: "DELETE",
    });
    const data = await response.json();
    alert (`${data.message}`);
    console.log(data)
    loadOrders();
  } catch (error) {
    console.log("erreur api", error);
  };
};
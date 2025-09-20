const API_URL = "http://localhost:3000";

const loadOrders = async (params) => {
  try {
    const response = await fetch(`${API_URL}/orders`)
    const orders = await response.json();
    for (const order of orders) {
      document.querySelector("#grid").innerHTML += `
        <div class="orderCard">
        <h3>Commande de user ${order.username}</h3>
        <p>${order.image}</p>
        <p>${order.plate} x 1</p>
        <p>${order.status}</p>
        </div>
        `;
    }
  } catch (error) {
    console.log("Having difficulty connecting to api.")
  }
}
loadOrders()
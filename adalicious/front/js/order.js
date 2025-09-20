const paramString = window.location.search
let indexParams = new URLSearchParams(paramString)
let index = indexParams.get("index")
// console.log(index)

const API_URL = "http://localhost:3000"
const user = localStorage.getItem("user")
document.querySelector("#message").innerHTML=`Merci pour ta commande ${user}`
const loadDish = async (index) => {
    try {
        const response = await fetch (`${API_URL}/menu/${index}/${user}`)
        const dish = await response.json()
        document.querySelector("#grid").innerHTML += `<div classe="card">
                <h3>En préparation</h3>
                <h2>${dish.image}</h2>
                <h3>${dish.plate} x 1</h3>
            </div>`
        console.log(dish)
        
    } catch (error) {
        console.log("Having difficulty connecting to api.")
    }
} 
loadDish(index)
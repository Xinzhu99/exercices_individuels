
const getData = async (params) => {
    try {
        const response = await fetch("/data/menu.json")
        const data = await response.json()
        return data
    } catch (error) {
        console.log('Having difficulty connecting to the local json.')
    }
}


let paramString = window.location.search
let searchParams = new URLSearchParams(paramString)
let userInput = searchParams.get("userName")

document.querySelector("#message").innerHTML=`Bonjour ${userInput}`

const loadMenu = async (params) => {
    let data = await getData()
    for (const item of data){
        document.querySelector("#grid").innerHTML+=
            `<div classe="card">
                <h2>${item.image}</h2>
                <h3>${item.plate}</h3>
                <p>${item.description}</p>
                <button id="orderBtn">Commander</button>
            </div>`
    // console.log(data)
    }
}
loadMenu()
import express from "express";
import cors from "cors";

const app = express();
app.use(cors()); //!il faut le mettre avant les routes!! sinon les apis ne recoivent pas le header 
const data = [
  {
    "plate": "Hello World Burger",
    "description": "Un cheeseburger classique (pain, steak, fromage, salade, sauce).",
    "image": "🍔"
  },
  {
    "plate": "404 Not Found Fries",
    "description": "Des frites maison avec une sauce mystère (choisie aléatoirement par le backend !).",
    "image": "🍟"
  },
  {
    "plate": "JSON Nuggets",
    "description": "Nuggets de poulet avec 3 sauces au choix (ketchup, mayo, barbecue).",
    "image": "🍗"
  },
  {
    "plate": "Git Pull Tacos",
    "description": "Un taco simple avec poulet, salade, fromage et sauce.",
    "image": "🌮"
  },
  {
    "plate": "Front-end Salad",
    "description": "Une salade légère avec tomates, feta et vinaigrette maison.",
    "image": "🥗"
  },
  {
    "plate": "Back-End Brownie",
    "description": "Un brownie moelleux au chocolat.",
    "image": "🍫"
  },
  {
    "plate": "Full Stack Menu",
    "description": "Un combo burger, frites et boisson.",
    "image": "🥗"
  }
];     
app.get("/", (req, res) => {  
res.send("Accueil");
});

app.get("/menu", (req, res) => {    
res.json(data);
});

let orders = []
//create an api with index and user params
//appele de cet api a deux résultats : envoi du plat trouvé + ajouter un object order dans orders
app.get("/menu/:index/:user", (req, res) => {  
const index = Number(req.params.index)
const user = req.params.user
const plat = data.find(p => data.indexOf(p) === index);  
if (!plat) return res.status(404).json({ error: `Plat id=${index} non trouvé` })
//créer un nouvel objet pour chaque commande qui contient les infos suivantes
  let order = {}
  order.plate = plat.plate
  order.description = plat.description
  order.image = plat.image
  order.username = user
  order.status = "En préparation"

  orders.push(order)

  res.json(plat);
});

app.get("/orders", (req, res) =>{
  res.json(orders)
})
app.get("/delete/:index", (req,res) => {
  const index=Number(req.params.index)
  orders.splice(index,1)
  res.json(orders)
})
let completedOrders = []
app.get("/complete/:index", (req,res) => {
  const index=Number(req.params.index)
  completedOrders.push(orders[index])
  orders.splice(index,1)
  res.json(orders)
})

app.listen(3000, () => {  console.log("Serveur lancé sur http://localhost:3000");});
// Active CORS → permet au front (par ex. sur un autre port) d'appeler ton back

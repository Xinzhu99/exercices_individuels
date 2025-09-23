import express from "express";
import cors from "cors";

const app = express();
app.use(cors()); //!il faut le mettre avant les routes!! sinon les apis ne recoivent pas le header 
app.use(express.json()); //!indispensable pour parser le json reçu du front
const data = [
  {
    "plate": "Hello World Burger",
    "description": "Un cheeseburger classique (pain, steak, fromage, salade, sauce).",
    "image": "🍔",
    "id":1
  },
  {
    "plate": "404 Not Found Fries",
    "description": "Des frites maison avec une sauce mystère (choisie aléatoirement par le backend !).",
    "image": "🍟",
    "id":2
  },
  {
    "plate": "JSON Nuggets",
    "description": "Nuggets de poulet avec 3 sauces au choix (ketchup, mayo, barbecue).",
    "image": "🍗",
    "id":3
  },
  {
    "plate": "Git Pull Tacos",
    "description": "Un taco simple avec poulet, salade, fromage et sauce.",
    "image": "🌮",
    "id":4
  },
  {
    "plate": "Front-end Salad",
    "description": "Une salade légère avec tomates, feta et vinaigrette maison.",
    "image": "🥗",
    "id":5
  },
  {
    "plate": "Back-End Brownie",
    "description": "Un brownie moelleux au chocolat.",
    "image": "🍫",
    "id":6
  },
  {
    "plate": "Full Stack Menu",
    "description": "Un combo burger, frites et boisson.",
    "image": "🥗",
    "id":7
  }
];     

//créer une route qui permet de récupérer tout le tableau des plats
app.get("/menu", (req, res) => {    
res.json(data);
});

//créer une route qui permet de récupérer le plat avec le param id
app.get("/menu/:id", (req, res) => {    
  const id= Number(req.params.id);   //!req.params permet de récupérer les params du front 
  const dish = data.find(item => item.id === id);
  if(!dish) return res.status(404).json({error: `Plat id=${id} non trouvé`});
  res.json(dish);
  // console.log(dish);
});

//appele de cet api : ajouter un object dans orders
const orders=[];
app.post("/orders", (req, res) =>{
  console.log("[POST/orders] body reçu:", req.body);
  const {idPlat, plate,client,status,image} = req.body; //!req.body est stocké dans une variable d'objet
  const newOrder ={
    id: orders.length+1, //!pour créer les ids auto-incrémenté
    idPlat,
    plate,
    client,
    status,
    image,
  }
  orders.push(newOrder);
  return res.status(201).json({ok:true,message:`commande ${plate} reçue de ${client}`})
});

app.get ("/orders/kitchen", (req, res) =>{
  const workingOrders = orders.filter(item => item.status === "En préparation")
  console.log(workingOrders)
  res.json(workingOrders);
})

app.patch("/orders/kitchen/update/:id", (req,res)=>{
  const id =Number(req.params.id);
  const {status} = req.body;
  const order =data.find(item => item.id === id);
  order.status = status;
  console.log(req.body)
  return res.status(201).json({ok:true, message:`commande ${id} est prête`})

})
app.listen(3000, () => {  console.log("Serveur lancé sur http://localhost:3000");});
// Active CORS → permet au front (par ex. sur un autre port) d'appeler ton back

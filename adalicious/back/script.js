import express from "express";
import cors from "cors";

const app = express();
app.use(cors()); //!il faut le mettre avant les routes!! sinon les apis ne recoivent pas le header 

app.get("/", (req, res) => {  
res.send("Accueil");
});

app.get("/menu", (req, res) => {    
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
res.json(data);
});

app.listen(3000, () => {  console.log("Serveur lancé sur http://localhost:3000");});
// Active CORS → permet au front (par ex. sur un autre port) d'appeler ton back

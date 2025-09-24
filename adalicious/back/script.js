import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Pool } from "pg"; //! npm install pg: le driver postgresql pour node.js

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // recommandé pour Neon afin de sécuriser la connexion
});

const app = express();
app.use(cors()); //!il faut le mettre avant les routes!! sinon les apis ne recoivent pas le header
app.use(express.json()); //!indispensable pour parser le json reçu du front

//créer une route qui permet de récupérer tout le tableau des plats
app.get("/menu", async (req, res) => {
  try {
    const result = await pool.query("SELECT * From dishes");
    res.json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération de data", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

//créer une route qui permet de récupérer le plat avec le param id
app.get("/menu/:id", async (req, res) => {
  const id = Number(req.params.id); //!req.params permet de récupérer les params du front
  try {
    const result = await pool.query(`SELECT * FROM dishes WHERE id=${id}`);
    if (!result)
      return res.status(404).json({ error: `Plat id=${id} non trouvé` });
    res.json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des recettes:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

//appel de cet api : ajouter un object dans orders
app.post("/orders", async (req, res) => {
  console.log("[POST/orders] body reçu:", req.body);
  const { dish_id, client_name, status } = req.body; //!req.body est stocké dans une variable d'objet

  try {
    //*vérifie si le client existe déjà
    const clientResult = await pool.query(
      "SELECT id from clients WHERE name = $1",
      [client_name]
    );
    console.log("clientresult", clientResult.rows);
    let client_id;
    if (clientResult.rows.length === 0) {
      //*créer un nouveau client dans la table clients
      const insertClient = await pool.query(
        "INSERT INTO clients (name) VALUES ($1) RETURNING id",
        [client_name]
      );
      client_id = insertClient.rows[0].id;
    } else {
      client_id = clientResult.rows[0].id;
    }
    //*insérer la commande dans orders
    const insertOrder = await pool.query(
      "INSERT INTO orders (client_id, dish_id, status) VALUES ($1,$2,$3) RETURNING id",
      [client_id, dish_id, status]
    );
    //*renvoyer un message alerte

    return res.status(201).json({
      ok: true,
      message: `commande du plat ${dish_id} reçue de ${client_name}`,
    });
  } catch (error) {
    console.error("erreur lors de la création de la commande", error);
  }
});

app.get("/orders/kitchen", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT dishes.plate, dishes.image, clients.name, orders.id\
       from orders\
       JOIN clients ON clients.id = orders.client_id\
       JOIN dishes ON dishes.id =orders.dish_id\
      WHERE orders.status= false"
    );
    if (!result)
      return res.status(404).json({ error: "pas de commande en préparation" });
    res.json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

app.patch("/orders/kitchen/update/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;
    const updateOrder = await pool.query("\
    UPDATE orders\
    SET status = $1\
    where id = $2 RETURNING *",[status, id]);
    return res
      .status(200)
      .json({ ok: true, message: `commande ${id} est prête` });
  } catch (error) {
    console.error("erreur lors de la mise à jour de la commande", error);
    res.status(500).json({error : "erreur serveur"});
  }
});


app.delete("/orders/kitchen/delete/:id", async (req, res) =>{
  try {
    const id = Number(req.params.id);
    const deleteOrder = await pool.query("DELETE from orders WHERE id =$1 RETURNING *", [id]);

    if (deleteOrder.rows.length === 0){
      return res.status(404).json({error: `commande ${id} non trouvée`})
    }
    return res.status(200)
    .json({
      ok: true,
      message: `commande ${id} supprimée`
    });
  } catch (error) {
    // console.error("erreur lors de la suppression commande", error);
    // res.status(500).json({error : "erreur serveur"});
  }
})

app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});